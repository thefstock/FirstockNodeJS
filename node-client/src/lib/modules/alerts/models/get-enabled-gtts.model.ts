import { IsOptional } from 'class-validator';

import {
  AlertTypeWrapper,
  EnumField,
  Nested,
  ResponseStatus,
  StringField,
  TimestampField,
} from '../../../common';

/**
 * The request model for get enabled gtts
 * @category Models
 */
export class GetEnabledGttsRequestModel {
  /**
   * The user id of the login user
   */
  @StringField({ isArray: false })
  uid: string;
}

/**
 * The response model for get enabled gtts
 * @category Models
 */
export class GetEnabledGttsResponseModel {
  /**
   * The get enabled gtts success or failure status
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
   * List of alert types
   */
  @Nested(AlertTypeWrapper, { isArray: true })
  @IsOptional()
  ai_ts?: AlertTypeWrapper[];
  /**
   * Error message if the request failed
   */
  @StringField({ isArray: false })
  @IsOptional()
  emsg?: string;
}
