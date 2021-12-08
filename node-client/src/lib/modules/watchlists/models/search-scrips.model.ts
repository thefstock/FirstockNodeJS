/**
 * @module
 * The request and response models for
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
 * The request model for search scrips
 */
export class SearchScripsRequestModel {
  /**
   * The user id of the login user
   */
  @StringField({ isArray: false })
  uid: string;
  /**
   * Search Text
   */
  @StringField({ isArray: false })
  stext: string;
  /**
   * Exchange (Select from ‘exarr’ Array provided in User Details response)
   */
  @StringField({ isArray: false })
  @IsOptional()
  exch?: string;
}

/**
 * The response model for search scrips
 */
export class SearchScripsResponseModel {
  /**
   * The search scrips success or failure status
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
