import { IsOptional } from 'class-validator';

import {
  EnumField,
  RequestSourceType,
  ResponseStatus,
  StringField,
  TimestampField,
} from '../../../common';

/**
 * The request model for set device pin
 * @category Models
 */
export class SetDevicePinRequestModel {
  /**
   * User Id
   */
  @StringField({ isArray: false })
  uid: string;
  /**
   * IMEI or device unique fingerprint
   */
  @StringField({ isArray: false })
  imei: string;
  /**
   * Access type
   */
  @EnumField(RequestSourceType)
  source: RequestSourceType;
  /**
   * New pin
   */
  @StringField({ isArray: false })
  dpin: string;
}

/**
 * The response model for set device pin
 * @category Models
 */
export class SetDevicePinResponseModel {
  /**
   * The set device pin success or failure status
   */
  @EnumField(ResponseStatus)
  stat: ResponseStatus;
  /**
   * It will be present only on successful setting of new pin.
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
