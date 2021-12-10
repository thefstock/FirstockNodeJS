import { IsOptional } from 'class-validator';

import {
  EnumField,
  Hashed,
  ResponseStatus,
  StringField,
  TimestampField,
} from '../../../common';

/**
 * The request model for change password
 * @category Models
 */
export class ChangePasswordRequestModel {
  /**
   * User Id
   */
  @StringField({ isArray: false })
  uid: string;
  /**
   * The old password
   */
  @StringField({ isArray: false })
  @Hashed()
  oldpwd: string;
  /**
   * The new password
   */
  @StringField({ isArray: false })
  pwd: string;
}

/**
 * The response model for change password
 * @category Models
 */
export class ChangePasswordResponseModel {
  /**
   * Password change success or failure status
   */
  @EnumField(ResponseStatus)
  stat: ResponseStatus;
  /**
   * Response recieved time
   */
  @TimestampField()
  request_time: Date;
  /**
   * This will be present only in case of success. Number of days to expiry will be present in same.
   */
  @StringField({ isArray: false })
  @IsOptional()
  dmsg?: string;
  /**
   * Error message if password change failed
   */
  @StringField({ isArray: false })
  @IsOptional()
  emsg?: string;
}
