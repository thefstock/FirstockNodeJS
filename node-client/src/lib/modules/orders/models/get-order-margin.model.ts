/**
 * @module
 * The request and response models for
 *  */
import { IsOptional } from 'class-validator';

import {
  EnumField,
  PriceType,
  ResponseStatus,
  StringField,
  TimestampField,
  TransactionType,
} from '../../../common';

/**
 * The request model for get order margin
 */
export class GetOrderMarginRequestModel {
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
   * C / M / H Product name (Select from ‘prarr’ Array provided in User Details response, and if same is allowed for selected, exchange. Show product display name, for user to select, and send corresponding prd in API call)
   */
  @StringField({ isArray: false })
  prd: string;
  /**
   * BUY or SELL
   */
  @EnumField(TransactionType)
  trantype: TransactionType;
  /**
   * LMT / MKT / SLLMT / SL-MKT / DS / 2L / 3L
   */
  @EnumField(PriceType)
  prctyp: PriceType;
  /**
   * Book loss Price applicable only if product is selected as H and B (High Leverage and Bracket order )
   */
  @StringField({ isArray: false })
  @IsOptional()
  blprc?: string;
  /**
   * Optional field. Application only for modify order, open order quantity
   */
  @StringField({ isArray: false })
  @IsOptional()
  rorgqty?: string;
  /**
   * Optional field. Application only for modify order, quantity already filled
   */
  @StringField({ isArray: false })
  @IsOptional()
  fillshares?: string;
  /**
   * Optional field. Application only for modify order, open order price
   */
  @StringField({ isArray: false })
  @IsOptional()
  rorgprc?: string;
  /**
   * Optional field. Application only for modify order, open order trigger price
   */
  @StringField({ isArray: false })
  @IsOptional()
  orgtrgprc?: string;
  /**
   * Optional field. Application only for H or B order modification
   */
  @StringField({ isArray: false })
  @IsOptional()
  norenordno?: string;
  /**
   * Optional field. Application only for H or B order modification
   */
  @StringField({ isArray: false })
  @IsOptional()
  snonum?: string;
}

/**
 * The response model for get order margin
 */
export class GetOrderMarginResponseModel {
  /**
   * The get order margin success or failure status
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
   * This field will be available only on success.
   */
  @StringField({ isArray: false })
  @IsOptional()
  remarks?: string;
  /**
   * Total credits available for order
   */
  @StringField({ isArray: false })
  @IsOptional()
  cash?: string;
  /**
   * Total margin used.
   */
  @StringField({ isArray: false })
  @IsOptional()
  marginused?: string;
  /**
   * Error message if the request failed
   */
  @StringField({ isArray: false })
  @IsOptional()
  emsg?: string;
}
