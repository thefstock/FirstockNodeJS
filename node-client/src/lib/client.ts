/**
 * @summary The client combines all the modules and abstracts the inner logic
 */
import { Container, Inject, Service } from 'typedi';

import {
  LoginRequestModel,
  LoginResponseModel,
  LogoutRequestModel,
  LogoutResponseModel
} from './modules/users';
import { UserService } from './modules/users/users.service';
import { PlainObject } from './utils';
import { Context, IContextParams } from './utils/context';

/**
 * The node client for communicating with external api.
 * Do not instantiate the client directly using this class.
 * Instead use the `createClient` factory function.
 * ```ts
 * const client: Client = createClient({ ... });
 * ```
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
    public readonly users: UserService
  ) { }

  /**
   * Login user. Alias for `client.users.login`
   * @param data The user login data
   */
  async login(data: PlainObject<LoginRequestModel>): Promise<LoginResponseModel> {
    const response = await this.users.login(data);
    // store the `susertoken` in context state if response was successful
    if (response.susertoken) {
      this.context.setState('key', response.susertoken);
    }
    return response;
  }

  /**
   * Logout user. Alias for `client.users.logout`
   * @param uid The id of the login user
   */
  async logout(uid: string): Promise<LogoutResponseModel>;
  /**
   * Logout user. Alias for `client.users.logout`
   * @param data The user logout data
   */
  async logout(data: PlainObject<LogoutRequestModel>): Promise<LoginResponseModel>;
  async logout(uidOrData: string | PlainObject<LogoutRequestModel>): Promise<LoginResponseModel> {
    const response = await this.users.logout(uidOrData as any);
    // remove key from context state
    this.context.deleteState('key');
    return response;
  }
}

/**
 * The factory function to create a client for the context.
 * All the services will be initialized for the given context.
 */
export function createClient(params: IContextParams, context = 'default') {
  Container.of(context).set(Context, new Context(params));
  return Container.of(context).get(Client);
}