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
 * The get predefined watch lists request model model
 */
export class GetPredefinedWatchlistsRequestModel {
  /**
   * The user id of the login user
   */
  @StringField({ isArray: false })
  uid: string;
}

/**
 * The get predefined watch lists response model model
 */
export class GetPredefinedWatchlistsResponseModel {
  /**
   * The get predefined watchlists success or failure status
   */
  @EnumField(ResponseStatus)
  @IsOptional()
  stat?: ResponseStatus;
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
