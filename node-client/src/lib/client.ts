/**
 * @module Client
 * @summary The client combines all the modules and abstracts the inner logic.
 * 
 */
import { isString } from 'class-validator';
import { Container, Inject, Service } from 'typedi';

import { AlertsService } from './modules/alerts/alerts.service';
import { FundsService } from './modules/funds/funds.service';
import { HoldingsLimitsService } from './modules/holdings-limits/holdings-limits.service';
import { MarketsService } from './modules/markets/markets.service';
import { OrdersService } from './modules/orders/orders.service';
import {
  LoginRequestModel,
  LoginResponseModel,
  LogoutRequestModel,
  LogoutResponseModel,
} from './modules/users/models';
import { UsersService } from './modules/users/users.service';
import { WatchlistsService } from './modules/watchlists/watchlists.service';
import { PlainObject } from './utils';
import { Context, IContextParams } from './utils/context';
import { WsClient } from './websockets/websocket.client';

/**
 * The node client for communicating with external api.
 * Do not instantiate the client directly using this class.
 * Instead use the [[`createClient`]] factory function.
 * ```ts
 * const client: Client = createClient({
 *    apiUrl: process.env.API_URL,
 *    wsUrl: process.env.WS_URL
 * });
 * ```
 * @category client
 */
@Service()
export class Client {
  @Inject()
  private context: Context;

  /**
   * Initialize the node client
   * @param users The users service
   */
  constructor(
    public readonly alerts: AlertsService,
    public readonly funds: FundsService,
    public readonly holdings_limits: HoldingsLimitsService,
    public readonly markets: MarketsService,
    public readonly orders: OrdersService,
    public readonly users: UsersService,
    public readonly watchlists: WatchlistsService,
    public readonly ws: WsClient
  ) {}

  /**
   * Login user. Alias for `client.users.login`
   * @param data The user login data
   */
  async login(
    data: PlainObject<LoginRequestModel>
  ): Promise<LoginResponseModel> {
    const response = await this.users.login(data);
    // store the `susertoken` in context state if response was successful
    if (response.susertoken) {
      this.context.setToken(response.susertoken);
    }
    return response;
  }

  /**
   * Logout user using uid.
   * @param uid The id of the login user
   */
  async logout(uid: string): Promise<LogoutResponseModel>;
  /**
   * Logout user. Alias for `client.users.logout`
   * @param data The user logout data
   */
  async logout(
    data: PlainObject<LogoutRequestModel>
  ): Promise<LoginResponseModel>;
  async logout(
    uidOrData: string | PlainObject<LogoutRequestModel>
  ): Promise<LoginResponseModel> {
    const data = isString(uidOrData) ? { uid: uidOrData } : uidOrData;
    const response = await this.users.logout(data);
    // remove key from context state
    this.context.deleteState('key');
    return response;
  }
}

/**
 * The factory function to create a client for the context.
 * All the services will be initialized for the given context.
 * @param params The client parameters
 * @param [context] an optional named context if you need to use multiple clients and contexts.
 * @category Entry point
 */
export function createClient(params: IContextParams, context = 'default') {
  Container.of(context).set(Context, new Context(params));
  return Container.of(context).get(Client);
}