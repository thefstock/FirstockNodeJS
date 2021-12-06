import { isString } from 'class-validator';
import { Inject, Service } from 'typedi';

import { Context, DataSource, PlainObject } from '../../utils';

import {
  LoginRequestModel,
  LoginResponseModel,
  LogoutRequestModel
} from './models';
import endpoints from './users.endpoints';

/**
 * The data source service for all login/logout and user requests.
 */
@Service()
export class UsersService extends DataSource {
  /**
   * The client context
   */
  @Inject()
  private _context: Context;
  get context() { return this._context; }
  /**
   * Login to the system using password or device pin.
   *  - If model contains the 'pwd' value login using normal login request.
   *  - If model contains the 'dpin' value login using device pin login request.
   * @param 
   */
  async login(data: PlainObject<LoginRequestModel>): Promise<LoginResponseModel> {
    // get the endpoint based on secret provided
    const endpoint = data.pwd ? endpoints.LOGIN : endpoints.LOGIN_WITH_DPIN;
    return this.send({
      data,
      endpoint,
      requestClass: LoginRequestModel,
      responseClass: LoginResponseModel,
    });
  }
  /**
   * Logout the user
   * @param uid The uid of the login user
   */
  async logout(uid: string): Promise<LoginResponseModel>;
  /**
   * Logout the user
   * @param data The logout request model
   */
  async logout(data: PlainObject<LogoutRequestModel>): Promise<LoginResponseModel>;
  async logout(uidOrData: string | PlainObject<LogoutRequestModel>): Promise<LoginResponseModel> {
    const endpoint = endpoints.LOGOUT;
    const data = isString(uidOrData) ? { uid: uidOrData } : uidOrData;
    return this.send({
      data,
      endpoint,
      requestClass: LoginRequestModel,
      responseClass: LoginResponseModel,
    });
  }
}