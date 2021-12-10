import { IsOptional } from 'class-validator';

import {
  EnumField,
  ResponseStatus,
  StringField,
  TimestampField,
} from '../../../common';

/**
 * The request model for exch msg
 * @category Models
 */
export class ExchMsgRequestModel {
  /**
   * The user id of the login user
   */
  @StringField({ isArray: false })
  uid: string;
  /**
   * Exchange
   */
  @StringField({ isArray: false })
  @IsOptional()
  exch?: string;
}

/**
 * The response model for exch msg
 * @category Models
 */
export class ExchMsgResponseModel {
  /**
   * The exch message success or failure status
   */
  @EnumField(ResponseStatus)
  stat: ResponseStatus;
  /**
   * Response received time
   */
  @TimestampField()
  @IsOptional()
  request_time?: Date;
  /**
   * It will be present only on a successful response
   */
  @StringField({ isArray: false })
  @IsOptional()
  exchmsg?: string;
  /**
   * Exchange Time
   */
  @TimestampField()
  @IsOptional()
  exchtm?: Date;
  /**
   * Error message if the request failed
   */
  @StringField({ isArray: false })
  @IsOptional()
  emsg?: string;
}
