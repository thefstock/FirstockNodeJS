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
 * The request model for exit sno order
 */
export class ExitSnoOrderRequestModel {
  /**
   * Logged in User Id
   */
  @StringField({ isArray: false })
  uid: string;
  /**
   * Noren order number, which needs to be cancelled
   */
  @StringField({ isArray: false })
  norenordno: string;
  /**
   * Allowed for only H and B products (Cover order and bracket order)
   */
  @StringField({ isArray: false })
  prd: string;
}

/**
 * The response model for exit sno order
 */
export class ExitSnoOrderResponseModel {
  /**
   * The exit sno success or failure status
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
   * Display message, (will be present only in case of success).
   */
  @StringField({ isArray: false })
  @IsOptional()
  dmsg?: string;
  /**
   * Error message if the request failed
   */
  @StringField({ isArray: false })
  @IsOptional()
  emsg?: string;
}
