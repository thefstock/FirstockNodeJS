/**
 * @module
 * The request and response models for
 *  */
import { IsOptional } from 'class-validator';

import {
  DateField,
  EnumField,
  ResponseStatus,
  StringField,
  TimestampField,
} from '../../../common';

/**
 * The request model for tp series
 */
export class TpSeriesRequestModel {
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
  /**
   * Token
   */
  @StringField({ isArray: false })
  token: string;
  /**
   * Start time
   */
  @DateField('DD-MM-YYYY hh:mm:ss')
  st: Date;
  /**
   * End Time
   */
  @DateField('DD-MM-YYYY hh:mm:ss')
  et: Date;
}

/**
 * The response model for tp series
 */
export class TpSeriesResponseModel {
  /**
   * The time price series success or failure status
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
   * DD/MM/CCYY hh:mm:ss
   */
  @TimestampField()
  @IsOptional()
  time?: Date;
  /**
   * Interval open
   */
  @StringField({ isArray: false })
  @IsOptional()
  into?: string;
  /**
   * Interval high
   */
  @StringField({ isArray: false })
  @IsOptional()
  inth?: string;
  /**
   * Interval low
   */
  @StringField({ isArray: false })
  @IsOptional()
  intl?: string;
  /**
   * Interval close
   */
  @StringField({ isArray: false })
  @IsOptional()
  intc?: string;
  /**
   * Interval vwap
   */
  @StringField({ isArray: false })
  @IsOptional()
  intvwap?: string;
  /**
   * Interval volume
   */
  @StringField({ isArray: false })
  @IsOptional()
  intv?: string;
  /**
   * volume
   */
  @StringField({ isArray: false })
  @IsOptional()
  v?: string;
  /**
   * Interval io change
   */
  @StringField({ isArray: false })
  @IsOptional()
  intoi?: string;
  /**
   * oi
   */
  @StringField({ isArray: false })
  @IsOptional()
  oi?: string;
  /**
   * Error message if the request failed
   */
  @StringField({ isArray: false })
  @IsOptional()
  emsg?: string;
}
