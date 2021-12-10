import { IsOptional } from 'class-validator';

import {
  EnumField,
  ResponseStatus,
  StringField,
  TimestampField,
} from '../../../common';

/**
 * The request model for get broker msg
 * @category Models
 */
export class GetBrokerMsgRequestModel {
  /**
   * The user id of the login user
   */
  @StringField({ isArray: false })
  uid: string;
}

/**
 * The response model for get broker msg
 * @category Models
 */
export class GetBrokerMsgResponseModel {
  /**
   * The get broker message success or failure status
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
   * This will be present only in case of success
   */
  @StringField({ isArray: false })
  @IsOptional()
  dmsg?: string;
  /**
   * Noren Time
   */
  @TimestampField()
  @IsOptional()
  norentm?: Date;
  /**
   * Error message if the request failed
   */
  @StringField({ isArray: false })
  @IsOptional()
  emsg?: string;
}
