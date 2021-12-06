/**
 * @module
 * The request and response models for 
 *  */
import { IsOptional } from 'class-validator';

import { DateField, EnumField, NumberField, ResponseStatus, StringField } from '../../../common';

/**
 * The request model for get max payout amount
*/
export class GetMaxPayoutAmountRequestModel {
  /**
   * The user id of the login user
  */
  @StringField({ isArray: false })
  uid: string;
  /**
   * The account id
  */
  @StringField({ isArray: false })
  actid: string;
}

/**
 * The response model for get max payout amount
*/
export class GetMaxPayoutAmountResponseModel {
  /**
   * The get max payout amount success or failure status
  */
  @EnumField(ResponseStatus)
  stat: ResponseStatus;
  /**
   * It will be present only on successful response.
  */
  @DateField("DD-MM-YYYY hh:mm:ss")
  @IsOptional()
  request_time?: Date;
  /**
   * Account Id
  */
  @StringField({ isArray: false })
  @IsOptional()
  actid?: string;
  /**
   * Maximum payout amount
  */
  @NumberField({ isArray: false })
  @IsOptional()
  payout?: number;
  /**
   * Error message if the request failed
  */
  @StringField({ isArray: false })
  @IsOptional()
  emsg?: string;
}
