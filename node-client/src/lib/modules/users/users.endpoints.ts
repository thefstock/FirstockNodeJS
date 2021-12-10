/**
 * @internal
 * The endpoints for users module
 *  */
const endpoints = {
  LOGIN: 'QuickAuth',
  LOGIN_WITH_DPIN: 'PinAuth',
  LOGOUT: 'Logout',
  FORGOT_PASSWORD: 'ForgotPassword',
  CHANGE_PASSWORD: 'Changepwd',
  SET_DEVICE_PIN: 'SetPin',
  GET_HS_TOKEN: 'GetHsToken',
  VALIDATE_HS_TOKEN: 'ValidateHsToken',
  USER_DETAILS: 'UserDetails',
  CLIENT_DETAILS: 'ClientDetails',
  SAVE_FCM_TOKEN: 'SaveFMCToken',
};

export default endpoints;
