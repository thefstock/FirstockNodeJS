import { IsOptional } from 'class-validator';

import {
  EnumField,
  Joined,
  ResponseStatus,
  StringField,
  TimestampField,
} from '../../../common';

/**
 * The request model for delete scrips
 * @category Models
 */
export class DeleteScripsRequestModel {
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
  /**
   * List of scrips
   */
  @StringField({ isArray: true })
  @Joined()
  scrips: string[];
}

/**
 * The response model for delete scrips
 * @category Models
 */
export class DeleteScripsResponseModel {
  /**
   * The delete scrips success or failure status
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
   * Error message if the request failed
   */
  @StringField({ isArray: false })
  @IsOptional()
  emsg?: string;
}
