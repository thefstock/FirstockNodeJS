/**
 * @module
 * The request and response models for
 *  */
import { IsOptional } from 'class-validator';

import {
  AlertValidity,
  EnumField,
  ResponseStatus,
  StringField,
  TimestampField,
} from '../../../common';

/**
 * The request model for get pending alert
 */
export class GetPendingAlertRequestModel {
  /**
   * The user id of the login user
   */
  @StringField({ isArray: false })
  uid: string;
}

/**
 * The response model for get pending alert
 */
export class GetPendingAlertResponseModel {
  /**
   * The get pending alert success or failure status
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
   * The id of the alert to modify
   */
  @StringField({ isArray: false })
  @IsOptional()
  al_id?: string;
  /**
   * Trading symbol
   */
  @StringField({ isArray: false })
  @IsOptional()
  tsym?: string;
  /**
   * Exchange Segment
   */
  @StringField({ isArray: false })
  @IsOptional()
  exch?: string;
  /**
   * Alert Type
   */
  @StringField({ isArray: false })
  @IsOptional()
  ai_t?: string;
  /**
   * Contract token
   */
  @StringField({ isArray: false })
  @IsOptional()
  token?: string;
  /**
   * DAY or GTT Validity
   */
  @EnumField(AlertValidity)
  validity: AlertValidity;
  /**
   * Any message Entered during order entry.
   */
  @StringField({ isArray: false })
  @IsOptional()
  remarks?: string;
  /**
   * Data to be compared with LTP
   */
  @StringField({ isArray: false })
  @IsOptional()
  d?: string;
  /**
   * Error message if the request failed
   */
  @StringField({ isArray: false })
  @IsOptional()
  emsg?: string;
}
