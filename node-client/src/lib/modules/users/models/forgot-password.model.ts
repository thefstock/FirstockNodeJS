/**
 * @module
 * The request and response models for
 *  */
import { IsOptional } from 'class-validator';

import {
  EnumField,
  ResponseStatus,
  StringField,
  TimestampField,
} from '../../../common';

/**
 * The request model for forgot password
 */
export class ForgotPasswordRequestModel {
  /**
   * User Id
   */
  @StringField({ isArray: false })
  uid: string;
  /**
   * PAN of the user
   */
  @StringField({ isArray: false })
  pan: string;
  /**
   * Date of birth
   */
  @TimestampField()
  dob: Date;
}

/**
 * The response model for forgot password
 */
export class ForgotPasswordResponseModel {
  /**
   * Password reset is Success Or failure status
   */
  @EnumField(ResponseStatus)
  stat: ResponseStatus;
  /**
   * Response received time
   */
  @TimestampField()
  request_time: Date;
  /**
   * Error message if the forgot password failed
   */
  @StringField({ isArray: false })
  @IsOptional()
  emsg?: string;
}
