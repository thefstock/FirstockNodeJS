/**
 * @module
 * The request and response models for
 *  */
import { IsOptional } from 'class-validator';

import {
  EnumField,
  Nested,
  ResponseStatus,
  StringField,
  TimestampField,
  TradeDate,
} from '../../../common';

/**
 * The request model for get unsettled trading date
 */
export class GetUnsettledTradingDateRequestModel {
  /**
   * The user id of the login user
   */
  @StringField({ isArray: false })
  uid: string;
}

/**
 * The response model for get unsettled trading date
 */
export class GetUnsettledTradingDateResponseModel {
  /**
   * The get unsettled trading date success or failure status
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
   * The list of trade date items
   */
  @Nested(TradeDate, { isArray: true })
  @IsOptional()
  trd_date?: TradeDate[];
  /**
   * Error message if the request failed
   */
  @StringField({ isArray: false })
  @IsOptional()
  emsg?: string;
}
