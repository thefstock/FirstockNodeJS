import { IsOptional } from 'class-validator';

import {
  EnumField,
  NumberField,
  ResponseStatus,
  StringField,
  TimestampField,
  TransactionType,
} from '../../../common';

/**
 * The request model for convert product
 * @category Models
 */
export class ConvertProductRequestModel {
  /**
   * Logged in User Id
   */
  @StringField({ isArray: false })
  uid: string;
  /**
     *
      Unique id of contract on which order was placed.
      Can’t be modified, must be the same as that of original order.
      (use url encoding to avoid special char error for symbols like M&M)
      
    */
  @StringField({ isArray: false })
  tsym: string;
  /**
   * Quantity to be converted.
   */
  @NumberField({ isArray: false })
  qty: number;
  /**
   * Account id
   */
  @StringField({ isArray: false })
  actid: string;
  /**
   * Product to which the user wants to convert position.
   */
  @StringField({ isArray: false })
  prd: string;
  /**
   * Original product of the position.
   */
  @StringField({ isArray: false })
  prevprd: string;
  /**
   * Transaction type
   */
  @EnumField(TransactionType)
  trantype: TransactionType;
  /**
   * Day / CF Converting Day or Carry forward position
   */
  @StringField({ isArray: false })
  postype: string;
  /**
   * MOB For Logging
   */
  @StringField({ isArray: false })
  @IsOptional()
  ordersource?: string;
}

/**
 * The response model for convert product
 * @category Models
 */
export class ConvertProductResponseModel {
  /**
   * The product conversion success or failure status
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
