/**
 * @module
 * The request and response models for
 *  */
import { IsOptional } from 'class-validator';

import {
  AlertValidity,
  EnumField,
  PriceType,
  ResponseStatus,
  RetentionType,
  StringField,
  TimestampField,
  TransactionType,
} from '../../../common';

/**
 * The request model for get pending gtt order
 */
export class GetPendingGttOrderRequestModel {
  /**
   * The user id of the login user
   */
  @StringField({ isArray: false })
  uid: string;
}

/**
 * The response model for get pending gtt order
 */
export class GetPendingGttOrderResponseModel {
  /**
   * The get pending gtt order success or failure status
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
   * Trading symbol
   */
  @StringField({ isArray: false })
  @IsOptional()
  tsym?: string;
  /**
   * Exchange Segment
   */
  @StringField({ isArray: false })
  @IsOptional()
  exch?: string;
  /**
   * Alert Type
   */
  @StringField({ isArray: false })
  @IsOptional()
  ai_t?: string;
  /**
   * Alert id
   */
  @StringField({ isArray: false })
  @IsOptional()
  al_id?: string;
  /**
   * Contract token
   */
  @StringField({ isArray: false })
  @IsOptional()
  token?: string;
  /**
   * DAY or GTT Validity
   */
  @EnumField(AlertValidity)
  @IsOptional()
  validity?: AlertValidity;
  /**
   * Any message Entered during order entry.
   */
  @StringField({ isArray: false })
  @IsOptional()
  remarks?: string;
  /**
   * Data to be compared with LTP
   */
  @StringField({ isArray: false })
  @IsOptional()
  d?: string;
  /**
   * Transaction type
   */
  @EnumField(TransactionType)
  @IsOptional()
  trantype?: TransactionType;
  /**
   * Price type
   */
  @EnumField(PriceType)
  @IsOptional()
  prctyp?: PriceType;
  /**
   * The product name
   */
  @StringField({ isArray: false })
  @IsOptional()
  prd?: string;
  /**
   * Retention type
   */
  @EnumField(RetentionType)
  @IsOptional()
  ret?: RetentionType;
  /**
   * Login user account id
   */
  @StringField({ isArray: false })
  @IsOptional()
  actid?: string;
  /**
   * Order price
   */
  @StringField({ isArray: false })
  @IsOptional()
  prc?: string;
  /**
   * Order quantity
   */
  @StringField({ isArray: false })
  @IsOptional()
  qty?: string;
  /**
   * Disclosed quantity (Max 10% for NSE, and 50% for MCX)
   */
  @StringField({ isArray: false })
  @IsOptional()
  dscqty?: string;
  /**
   * Error message if the request failed
   */
  @StringField({ isArray: false })
  @IsOptional()
  emsg?: string;
}
