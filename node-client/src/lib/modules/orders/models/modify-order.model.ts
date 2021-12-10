import { IsOptional } from 'class-validator';

import {
  EnumField,
  PriceType,
  ResponseStatus,
  RetentionType,
  StringField,
  TimestampField,
} from '../../../common';

/**
 * The request model for modify order
 * @category Models
 */
export class ModifyOrderRequestModel {
  /**
   * Logged in User Id
   */
  @StringField({ isArray: false })
  uid: string;
  /**
   * Exchange
   */
  @StringField({ isArray: false })
  exch: string;
  /**
   * Noren order number, which needs to be modified
   */
  @StringField({ isArray: false })
  norenordno: string;
  /**
   * Unique id of contract on which order to be placed. (use url encoding to avoid special char error for symbols like M&M)
   */
  @StringField({ isArray: false })
  tsym: string;
  /**
   * Modified / New Quantity
   */
  @StringField({ isArray: false })
  @IsOptional()
  qty?: string;
  /**
   * Modified / New price
   */
  @StringField({ isArray: false })
  @IsOptional()
  prc?: string;
  /**
   * New trigger price in case of SL-MKT or SL-LMT
   */
  @StringField({ isArray: false })
  @IsOptional()
  trgprc?: string;
  /**
   * LMT / MKT / SLLMT / SL-MKT / DS / 2L / 3L
   */
  @EnumField(PriceType)
  @IsOptional()
  prctyp?: PriceType;
  /**
   * New Retention type of the order.
   */
  @EnumField(RetentionType)
  @IsOptional()
  ret?: RetentionType;
  /**
   * Book Profit Price applicable only if product is selected as B (Bracket order )
   */
  @StringField({ isArray: false })
  @IsOptional()
  bpprc?: string;
  /**
   * Book loss Price applicable only if product is selected as H and B (High Leverage and Bracket order )
   */
  @StringField({ isArray: false })
  @IsOptional()
  blprc?: string;
  /**
   * Trailing Price applicable only if product is selected as H and B (High Leverage and Bracket order )
   */
  @StringField({ isArray: false })
  @IsOptional()
  trailprc?: string;
}

/**
 * The response model for modify order
 * @category Models
 */
export class ModifyOrderResponseModel {
  /**
   * The modify order success or failure status
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
   * Noren Order number of the order modified.
   */
  @StringField({ isArray: false })
  @IsOptional()
  result?: string;
  /**
   * Error message if the request failed
   */
  @StringField({ isArray: false })
  @IsOptional()
  emsg?: string;
}
