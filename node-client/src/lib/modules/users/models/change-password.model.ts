/**
 * @module
 * Request and response models for change password
 */
import { IsOptional, ValidateIf } from "class-validator";

import {
  DateField,
  EnumField,
  Hashed,
  ResponseStatus,
  StringField
} from "../../../common";

/**
 * The request model for change password endpoint
 */
export class ChangePasswordRequestModel {
  /**
   * user id
   */
  @StringField()
  uid: string;
  /**
   * The old password
   */
  @Hashed()
  @StringField()
  oldpwd: string;
  /**
   * The new password
   */
  @StringField()
  pwd: string;
}

/**
 * The response model for change password endpoint
 */
export class ChangePasswordResponseModel {
  /**
   * Password change success or failure status
   */
  @EnumField(ResponseStatus)
  stat: ResponseStatus;
  /**
   * This will be present only in case of success. Number of days to expiry will be present in same.
   */
  @StringField()
  @IsOptional()
  dmsg?: string;
  /**
   * It will be present only on successful request.
   */
  @DateField()
  @ValidateIf(o => o.stat === ResponseStatus.OK)
  request_time?: Date;
  /**
   * Error message if the request failed
   */
  @StringField()
  @IsOptional()
  emsg?: string;
}