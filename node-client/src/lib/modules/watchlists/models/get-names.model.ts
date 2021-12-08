/**
 * @module
 * common models used across the project
 *  */

import { IsOptional } from 'class-validator';

import {
  EnumField,
  ResponseStatus,
  StringField,
  TimestampField,
} from '../../../common';

/**
 * The get watch list names request model model
 */
export class GetWatchlistNamesRequestModel {
  /**
   * The user id of the login user
   */
  @StringField({ isArray: false })
  uid: string;
}

/**
 * The get watch list names response model model
 */
export class GetWatchlistNamesResponseModel {
  /**
   * The get names success or failure status
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
  @StringField({ isArray: true })
  values: string[];
  /**
   * Error message if the request failed
   */
  @StringField({ isArray: false })
  @IsOptional()
  emsg?: string;
}
