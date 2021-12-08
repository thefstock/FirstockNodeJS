/**
 * @module
 * The request and response models for
 *  */
import { IsOptional } from 'class-validator';

import {
  EnumField,
  PriceType,
  ResponseStatus,
  RetentionType,
  StringField,
  TimestampField,
  TransactionType,
} from '../../../common';

/**
 * The request model for trade book
 */
export class TradeBookRequestModel {
  /**
   * Logged in User Id
   */
  @StringField({ isArray: false })
  uid: string;
  /**
   * Account Id of logged in user
   */
  @StringField({ isArray: false })
  actid: string;
}

/**
 * The response model for trade book
 */
export class TradeBookResponseModel {
  /**
   * The trade book success or failure status
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
   * Exchange Segment
   */
  @StringField({ isArray: false })
  @IsOptional()
  exch?: string;
  /**
   * Trading symbol / contract on which order is placed.
   */
  @StringField({ isArray: false })
  @IsOptional()
  tsym?: string;
  /**
   * Noren Order Number
   */
  @StringField({ isArray: false })
  @IsOptional()
  norenordno?: string;
  /**
   * Order Price
   */
  @StringField({ isArray: false })
  @IsOptional()
  prc?: string;
  /**
   * Order Quantity
   */
  @StringField({ isArray: false })
  @IsOptional()
  qty?: string;
  /**
   * Display product alias name, using prarr returned in user details.
   */
  @StringField({ isArray: false })
  @IsOptional()
  prd?: string;
  /**
   * B / S Transaction type of the order
   */
  @EnumField(TransactionType)
  @IsOptional()
  trantype?: TransactionType;
  /**
   * LMT / MKT Price type
   */
  @EnumField(PriceType)
  @IsOptional()
  prctyp?: PriceType;
  /**
   * Total Traded Quantity of this order
   */
  @StringField({ isArray: false })
  @IsOptional()
  fillshares?: string;
  /**
   * Average trade price of total traded quantity
   */
  @StringField({ isArray: false })
  @IsOptional()
  avgprc?: string;
  /**
   * If order is rejected, reason in text form
   */
  @StringField({ isArray: false })
  @IsOptional()
  rejreason?: string;
  /**
   * Exchange Order Number
   */
  @StringField({ isArray: false })
  @IsOptional()
  exchordid?: string;
  /**
   * DAY / IOC / EOS Order validity
   */
  @EnumField(RetentionType)
  @IsOptional()
  ret?: RetentionType;
  /**
   * User Id
   */
  @StringField({ isArray: false })
  @IsOptional()
  uid?: string;
  /**
   * Account Id
   */
  @StringField({ isArray: false })
  @IsOptional()
  actid?: string;
  /**
   * Price precision
   */
  @StringField({ isArray: false })
  @IsOptional()
  pp?: string;
  /**
   * Tick size
   */
  @StringField({ isArray: false })
  @IsOptional()
  ti?: string;
  /**
   * Lot size
   */
  @StringField({ isArray: false })
  @IsOptional()
  ls?: string;
  /**
   * Custom Firm
   */
  @StringField({ isArray: false })
  @IsOptional()
  cstFrm?: string;
  /**
   * Fill Time
   */
  @StringField({ isArray: false })
  @IsOptional()
  fltm?: string;
  /**
   * Fill ID
   */
  @StringField({ isArray: false })
  @IsOptional()
  flid?: string;
  /**
   * Fill Qty
   */
  @StringField({ isArray: false })
  @IsOptional()
  flqty?: string;
  /**
   * Fill Price
   */
  @StringField({ isArray: false })
  @IsOptional()
  flprc?: string;
  /**
   * Order Source
   */
  @StringField({ isArray: false })
  @IsOptional()
  ordersource?: string;
  /**
   * Token
   */
  @StringField({ isArray: false })
  @IsOptional()
  token?: string;
  /**
   * Error message if the request failed
   */
  @StringField({ isArray: false })
  @IsOptional()
  emsg?: string;
}
