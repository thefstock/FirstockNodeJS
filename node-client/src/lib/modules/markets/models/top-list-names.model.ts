/**
 * @module
 * The request and response models for
 *  */
import { IsOptional } from 'class-validator';

import {
  BasketCriteriaPair,
  EnumField,
  Nested,
  ResponseStatus,
  StringField,
  TimestampField,
} from '../../../common';

/**
 * The request model for top list names
 */
export class TopListNamesRequestModel {
  /**
   * The user id of the login user
   */
  @StringField({ isArray: false })
  uid: string;
  /**
   * Exchange
   */
  @StringField({ isArray: false })
  exch: string;
}

/**
 * The response model for top list names
 */
export class TopListNamesResponseModel {
  /**
   * The top list names success or failure status
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
   * Array of Basket, Criteria pair
   */
  @Nested(BasketCriteriaPair, { isArray: true })
  @IsOptional()
  values?: BasketCriteriaPair[];
  /**
   * Error message if the request failed
   */
  @StringField({ isArray: false })
  @IsOptional()
  emsg?: string;
}
