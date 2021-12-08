/**
 * @module
 * The request and response models for
 *  */
import { IsOptional } from 'class-validator';

import {
  AlertValidity,
  EnumField,
  StringField,
  TimestampField,
} from '../../../common';

/**
 * The request model for modify alert
 */
export class ModifyAlertRequestModel {
  /**
   * The user id of the login user
   */
  @StringField({ isArray: false })
  uid: string;
  /**
   * The id of the alert to modify
   */
  @StringField({ isArray: false })
  al_id: string;
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
  @StringField({ isArray: false })
  ai_t: string;
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
  d: string;
}

/**
 * The response model for modify alert
 */
export class ModifyAlertResponseModel {
  /**
   * The modify alert success or failure status
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
   * The modified alert id
   */
  @StringField({ isArray: false })
  al_id: string;
  /**
   * Error message if the request failed
   */
  @StringField({ isArray: false })
  @IsOptional()
  emsg?: string;
}
