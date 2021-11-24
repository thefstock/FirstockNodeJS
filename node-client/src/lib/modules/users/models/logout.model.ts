/**
 * @module
 * Request and response models for logout
 */
import { IsOptional, ValidateIf } from 'class-validator';

import {
  DateField,
  EnumField,
  ResponseStatus,
  StringField
} from "../../../common";

/**
 * The request model for logout endpoint
 */
export class LogoutRequestModel {
  /**
   * The user id of the login user
   */
  @StringField()
  uid: string;
}

/**
 * The response model for logout endpoint
 */
export class LogoutResponseModel {
  /**
   * success or failure status
   */
  @EnumField(ResponseStatus)
  stat: ResponseStatus = ResponseStatus.OK;
  /**
   * It will be present only on successful logout.
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