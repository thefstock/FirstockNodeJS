import { Inject, Service } from 'typedi';

import { Context, DataSource, PlainObject } from '../../utils';

import {
  ChangePasswordRequestModel,
  ChangePasswordResponseModel,
  ClientDetailsRequestModel,
  ClientDetailsResponseModel,
  ForgotPasswordRequestModel,
  ForgotPasswordResponseModel,
  GetHsTokenRequestModel,
  GetHsTokenResponseModel,
  LoginRequestModel,
  LoginResponseModel,
  LogoutRequestModel,
  LogoutResponseModel,
  SaveFcmTokenRequestModel,
  SaveFcmTokenResponseModel,
  SetDevicePinRequestModel,
  SetDevicePinResponseModel,
  UserDetailsRequestModel,
  UserDetailsResponseModel,
} from './models';
import endpoints from './users.endpoints';

/**
 * The data source service for users module.
 * @category Data Sources
 */
@Service()
export class UsersService extends DataSource {
  /**
   * The client context
   */
  @Inject()
  _context: Context;
  get context() {
    return this._context;
  }
  /**
   * Login to the system using password or device pin.
   * @param data The payload for login request
   */
  async login(
    data: PlainObject<LoginRequestModel>
  ): Promise<LoginResponseModel> {
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
   * @param data The payload for logout request
   */
  async logout(
    data: PlainObject<LogoutRequestModel>
  ): Promise<LogoutResponseModel> {
    const endpoint = endpoints.LOGOUT;
    return this.send({
      data,
      endpoint,
      requestClass: LogoutRequestModel,
      responseClass: LogoutResponseModel,
    });
  }
  /**
   * Send a forgot password request to reset password
   * @param data The payload for forgot password request
   */
  async forgotPassword(
    data: PlainObject<ForgotPasswordRequestModel>
  ): Promise<ForgotPasswordResponseModel> {
    const endpoint = endpoints.FORGOT_PASSWORD;
    return this.send({
      data,
      endpoint,
      requestClass: ForgotPasswordRequestModel,
      responseClass: ForgotPasswordResponseModel,
    });
  }
  /**
   * Change current password
   * @param data The payload for change password request
   */
  async changePassword(
    data: PlainObject<ChangePasswordRequestModel>
  ): Promise<ChangePasswordResponseModel> {
    const endpoint = endpoints.CHANGE_PASSWORD;
    return this.send({
      data,
      endpoint,
      requestClass: ChangePasswordRequestModel,
      responseClass: ChangePasswordResponseModel,
    });
  }
  /**
   * Set device pin
   * @param data The payload for set device pin request
   */
  async setDevicePin(
    data: PlainObject<SetDevicePinRequestModel>
  ): Promise<SetDevicePinResponseModel> {
    const endpoint = endpoints.SET_DEVICE_PIN;
    return this.send({
      data,
      endpoint,
      requestClass: SetDevicePinRequestModel,
      responseClass: SetDevicePinResponseModel,
    });
  }
  /**
   * Get one time hs token
   * @param data The payload for get hs token request
   */
  async getHsToken(
    data: PlainObject<GetHsTokenRequestModel>
  ): Promise<GetHsTokenResponseModel> {
    const endpoint = endpoints.GET_HS_TOKEN;
    return this.send({
      data,
      endpoint,
      requestClass: GetHsTokenRequestModel,
      responseClass: GetHsTokenResponseModel,
    });
  }
  /**
   * Check if the given HS token is valid or not
   * @param data The payload for validate hs token request
   */
  async validateHsToken(loginId: string, token: string): Promise<boolean> {
    const endpoint = endpoints.VALIDATE_HS_TOKEN;
    const response = await this.request(endpoint, [
      `LoginId=${loginId}`,
      `token=${token}`,
    ]);
    return response === 'TRUE';
  }
  /**
   * Fetch details of the logged in user
   * @param data The payload for user details request
   */
  async userDetails(
    data: PlainObject<UserDetailsRequestModel>
  ): Promise<UserDetailsResponseModel> {
    const endpoint = endpoints.USER_DETAILS;
    return this.send({
      data,
      endpoint,
      requestClass: UserDetailsRequestModel,
      responseClass: UserDetailsResponseModel,
    });
  }
  /**
   * Fetch client details for the logged in user
   * @param data The payload for client details request
   */
  async clientDetails(
    data: PlainObject<ClientDetailsRequestModel>
  ): Promise<ClientDetailsResponseModel> {
    const endpoint = endpoints.CLIENT_DETAILS;
    return this.send({
      data,
      endpoint,
      requestClass: ClientDetailsRequestModel,
      responseClass: ClientDetailsResponseModel,
    });
  }
  /**
   * Send request to save FCM token
   * @param data The payload for save fcm token request
   */
  async saveFcmToken(
    data: PlainObject<SaveFcmTokenRequestModel>
  ): Promise<SaveFcmTokenResponseModel> {
    const endpoint = endpoints.SAVE_FCM_TOKEN;
    return this.send({
      data,
      endpoint,
      requestClass: SaveFcmTokenRequestModel,
      responseClass: SaveFcmTokenResponseModel,
    });
  }
}
