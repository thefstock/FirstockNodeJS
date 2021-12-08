/**
 * @module
 * The request and response models for
 *  */
import { IsOptional } from 'class-validator';

import {
  EnumField,
  IndexTokenPair,
  Nested,
  ResponseStatus,
  StringField,
  TimestampField,
} from '../../../common';

/**
 * The request model for get index list
 */
export class GetIndexListRequestModel {
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
 * The response model for get index list
 */
export class GetIndexListResponseModel {
  /**
   * The get index list success or failure status
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
   * Array Of index token pair.
   */
  @Nested(IndexTokenPair, { isArray: true })
  @IsOptional()
  values?: IndexTokenPair[];
  /**
   * Error message if the request failed
   */
  @StringField({ isArray: false })
  @IsOptional()
  emsg?: string;
}
