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
 * The request model for single order history
 * @category Models
 */
export class SingleOrderHistoryRequestModel {
  /**
   * Logged in User Id
   */
  @StringField({ isArray: false })
  uid: string;
  /**
   * Noren Order Number
   */
  @StringField({ isArray: false })
  norenordno: string;
}

/**
 * The response model for single order history
 * @category Models
 */
export class SingleOrderHistoryResponseModel {
  /**
   * The single order history success or failure status
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
   * Order status
   */
  @StringField({ isArray: false })
  @IsOptional()
  status?: string;
  /**
   * Report Type (fill/complete etc)
   */
  @StringField({ isArray: false })
  @IsOptional()
  rpt?: string;
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
   * Canceled quantity for order which is in status cancelled.
   */
  @StringField({ isArray: false })
  @IsOptional()
  cancelqty?: string;
  /**
   * Any message Entered during order entry.
   */
  @StringField({ isArray: false })
  @IsOptional()
  remarks?: string;
  /**
   * Order disclosed quantity.
   */
  @StringField({ isArray: false })
  @IsOptional()
  dscqty?: string;
  /**
   * Order trigger price
   */
  @StringField({ isArray: false })
  @IsOptional()
  trgprc?: string;
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
  /**
   * Yes / No
   */
  @StringField({ isArray: false })
  @IsOptional()
  amo?: string;
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
   * Contract Token
   */
  @StringField({ isArray: false })
  @IsOptional()
  token?: string;
  /**
   * orddttm
   */
  @StringField({ isArray: false })
  @IsOptional()
  orddttm?: string;
  /**
   * ordenttm
   */
  @StringField({ isArray: false })
  @IsOptional()
  ordenttm?: string;
  /**
   * extm
   */
  @StringField({ isArray: false })
  @IsOptional()
  extm?: string;
  /**
   * Error message if the request failed
   */
  @StringField({ isArray: false })
  @IsOptional()
  emsg?: string;
}
