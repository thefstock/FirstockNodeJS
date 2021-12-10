import { IsOptional } from 'class-validator';

import { StringField, TimestampField } from '../../../common';

/**
 * The request model for cancel gtt order
 * @category Models
 */
export class CancelGttOrderRequestModel {
  /**
   * The user id of the login user
   */
  @StringField({ isArray: false })
  @IsOptional()
  uid?: string;
  /**
   * Alert Id
   */
  @StringField({ isArray: false })
  al_id: string;
}

/**
 * The response model for cancel gtt order
 * @category Models
 */
export class CancelGttOrderResponseModel {
  /**
   * The cancel gtt order success or failure status
   */
  @StringField({ isArray: false })
  stat: string;
  /**
   * It will be present only on successful response.
   */
  @TimestampField()
  @IsOptional()
  request_time?: Date;
  /**
   * Alert Id
   */
  @StringField({ isArray: false })
  @IsOptional()
  al_id?: string;
  /**
   * Error message if the request failed
   */
  @StringField({ isArray: false })
  @IsOptional()
  emsg?: string;
}
