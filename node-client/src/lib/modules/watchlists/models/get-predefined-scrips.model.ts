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
 * The request model for get predefined scrips
 * @category Models
 */
export class GetPredefinedScripsRequestModel {
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
 * The response model for get predefined scrips
 * @category Models
 */
export class GetPredefinedScripsResponseModel {
  /**
   * The get predefined scrips success or failure status
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
