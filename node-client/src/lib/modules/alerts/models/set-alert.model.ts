/**
 * @module
 * The request and response models for
 *  */
import { IsOptional } from 'class-validator';

import {
  AlertType,
  AlertValidity,
  EnumField,
  StringField,
  TimestampField,
} from '../../../common';

/**
 * The request model for set alert
 */
export class SetAlertRequestModel {
  /**
   * The user id of the login user
   */
  @StringField({ isArray: false })
  uid: string;
  /**
   * Trading symbol
   */
  @StringField({ isArray: false })
  tsym: string;
  /**
   * Exchange Segment
   */
  @StringField({ isArray: false })
  exch: string;
  /**
   * Alert Type
   */
  @EnumField(AlertType)
  ai_t: AlertType;
  /**
   * DAY or GTT Validity
   */
  @EnumField(AlertValidity)
  validity: AlertValidity;
  /**
   * Any message Entered during order entry.
   */
  @StringField({ isArray: false })
  remarks: string;
  /**
   * Data to be compared with LTP
   */
  @StringField({ isArray: false })
  @IsOptional()
  d?: string;
}

/**
 * The response model for set alert
 */
export class SetAlertResponseModel {
  /**
   * The set alert success or failure status
   */
  @StringField({ isArray: false })
  stat: string;
  /**
   * It will be present only on successful response.
   */
  @TimestampField()
  @IsOptional()
  request_time?: Date;
  /**
   * Alert Id
   */
  @StringField({ isArray: false })
  @IsOptional()
  al_id?: string;
  /**
   * Error message if the request failed
   */
  @StringField({ isArray: false })
  @IsOptional()
  emsg?: string;
}
