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
 * The request model for cancel order
 */
export class CancelOrderRequestModel {
  /**
   * Logged in User Id
   */
  @StringField({ isArray: false })
  uid: string;
  /**
   * The order number, which needs to be cancelled
   */
  @StringField({ isArray: false })
  norenordno: string;
}

/**
 * The response model for cancel order
 */
export class CancelOrderResponseModel {
  /**
   * The cancel order success or failure status
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
   * Noren Order number of the order modified.
   */
  @StringField({ isArray: false })
  @IsOptional()
  result?: string;
  /**
   * Error message if the request failed
   */
  @StringField({ isArray: false })
  @IsOptional()
  emsg?: string;
}
