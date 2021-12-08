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
 * The request model for place order
 */
export class PlaceOrderRequestModel {
  /**
   * Logged in User Id
   */
  @StringField({ isArray: false })
  uid: string;
  /**
   * Login users account ID
   */
  @StringField({ isArray: false })
  actid: string;
  /**
   * Exchange (Select from ‘exarr’ Array provided in User Details response)
   */
  @StringField({ isArray: false })
  exch: string;
  /**
   * Unique id of contract on which order to be placed. (use url encoding to avoid special char error for symbols like M&M)
   */
  @StringField({ isArray: false })
  tsym: string;
  /**
   * Order Quantity
   */
  @StringField({ isArray: false })
  qty: string;
  /**
   * Order Price
   */
  @StringField({ isArray: false })
  prc: string;
  /**
   * Only to be sent in case of SL / SL-M order.
   */
  @StringField({ isArray: false })
  @IsOptional()
  trgprc?: string;
  /**
   * Disclosed quantity (Max 10% for NSE, and 50% for MCX)
   */
  @StringField({ isArray: false })
  @IsOptional()
  dscqty?: string;
  /**
   * C / M / H Product name (Select from ‘prarr’ Array provided in User Details response, and if same is allowed for selected, exchange. Show product display name, for user to select, and send corresponding prd in API call)
   */
  @StringField({ isArray: false })
  prd: string;
  /**
   * B / S B -> BUY, S -> SELL
   */
  @EnumField(TransactionType)
  trantype: TransactionType;
  /**
   * LMT / MKT / SLLMT / SL-MKT / DS / 2L / 3L
   */
  @EnumField(PriceType)
  prctyp: PriceType;
  /**
   * DAY / EOS / IOC Retention type (Show options as per allowed exchanges) remarks Any tag by user to mark order.
   */
  @EnumField(RetentionType)
  ret: RetentionType;
  /**
   * MOB / WEB / TT Used to generate exchange info fields.
   */
  @StringField({ isArray: false })
  @IsOptional()
  ordersource?: string;
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
   * Yes , If not sent, of Not “Yes”, will be treated as Regular order.
   */
  @StringField({ isArray: false })
  @IsOptional()
  amo?: string;
  /**
   * Trading symbol of second leg, mandatory for price type 2L and 3L (use url encoding to avoid special char error for symbols like M&M)
   */
  @StringField({ isArray: false })
  @IsOptional()
  tsym2?: string;
  /**
   * Transaction type of second leg, mandatory for price type 2L and 3L
   */
  @EnumField(TransactionType)
  @IsOptional()
  trantype2?: TransactionType;
  /**
   * Quantity for second leg, mandatory for price type 2L and 3L
   */
  @StringField({ isArray: false })
  @IsOptional()
  qty2?: string;
  /**
   * Price for second leg, mandatory for price type 2L and 3L
   */
  @StringField({ isArray: false })
  @IsOptional()
  prc2?: string;
  /**
   * Trading symbol of third leg, mandatory for price type 3L (use url encoding to avoid special char error for symbols like M&M)
   */
  @StringField({ isArray: false })
  @IsOptional()
  tsym3?: string;
  /**
   * Transaction type of third leg, mandatory for price type 3L
   */
  @EnumField(TransactionType)
  @IsOptional()
  trantype3?: TransactionType;
  /**
   * Quantity for third leg, mandatory for price type 3L
   */
  @StringField({ isArray: false })
  @IsOptional()
  qty3?: string;
  /**
   * Price for third leg, mandatory for price type 3L
   */
  @StringField({ isArray: false })
  @IsOptional()
  prc3?: string;
}

/**
 * The response model for place order
 */
export class PlaceOrderResponseModel {
  /**
   * The place order success or failure status
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
   * It will be present only on successful Order placement to OMS.
   */
  @StringField({ isArray: false })
  @IsOptional()
  norenordno?: string;
  /**
   * Error message if the request failed
   */
  @StringField({ isArray: false })
  @IsOptional()
  emsg?: string;
}
