/**
 * 
 * common models used across the project
 *  */

import { IsOptional } from 'class-validator';

import {
  EnumField,
  Nested,
  ResponseStatus,
  Scrip,
  StringField,
  TimestampField,
} from '../../../common';

/**
 * The get watch list request model model
 */
export class GetWatchlistRequestModel {
  /**
   * The user id of the login user
   */
  @StringField({ isArray: false })
  uid: string;
  /**
   * Name of the Watchlist, for which scrip list is required
   */
  @StringField({ isArray: false })
  wlname: string;
}

/**
 * The get watch list response model model
 */
export class GetWatchlistResponseModel {
  /**
   * The get watchlist success or failure status
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
   * Watch List names as a json array of strings.
   */
  @Nested(Scrip, { isArray: true })
  values: Scrip[];
  /**
   * Error message if the request failed
   */
  @StringField({ isArray: false })
  @IsOptional()
  emsg?: string;
}
