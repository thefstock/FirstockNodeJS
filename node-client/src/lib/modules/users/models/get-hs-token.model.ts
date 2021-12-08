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
 * The request model for get hs token
 */
export class GetHsTokenRequestModel {
  /**
   * The uid property
   */
  @StringField({ isArray: false })
  uid: string;
}

/**
 * The response model for get hs token
 */
export class GetHsTokenResponseModel {
  /**
   * The logout success or failure status
   */
  @EnumField(ResponseStatus)
  stat: ResponseStatus;
  /**
   * It will be present only on successful response.
   */
  @TimestampField()
  @IsOptional()
  request_time?: Date;
  /**
   * One time Token to be sent to BackOffice or third party link
   */
  @StringField({ isArray: false })
  @IsOptional()
  hstk?: string;
  /**
   * Error message if the request failed
   */
  @StringField({ isArray: false })
  @IsOptional()
  emsg?: string;
}
