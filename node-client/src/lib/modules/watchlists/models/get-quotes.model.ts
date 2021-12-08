/**
 * @module
 * The request and response models for
 *  */
import { IsOptional } from 'class-validator';

import {
  EnumField,
  NumberField,
  ResponseStatus,
  StringField,
  TimestampField,
} from '../../../common';

/**
 * The request model for get quotes
 */
export class GetQuotesRequestModel {
  /**
   * The user id of the login user
   */
  @StringField({ isArray: false })
  uid: string;
  /**
   * Exchange
   */
  @StringField({ isArray: false })
  @IsOptional()
  exch?: string;
  /**
   * Contract Token
   */
  @StringField({ isArray: false })
  @IsOptional()
  token?: string;
}

/**
 * The response model for get quotes
 */
export class GetQuotesResponseModel {
  /**
   * The get scrips success or failure status
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
  /**
   * Exchange
   */
  @StringField({ isArray: false })
  @IsOptional()
  exch?: string;
  /**
   * Trading Symbol
   */
  @StringField({ isArray: false })
  @IsOptional()
  tsym?: string;
  /**
   * Company Name
   */
  @StringField({ isArray: false })
  @IsOptional()
  cname?: string;
  /**
   * Symbol Name
   */
  @StringField({ isArray: false })
  @IsOptional()
  symnam?: string;
  /**
   * Segment
   */
  @StringField({ isArray: false })
  @IsOptional()
  seg?: string;
  /**
   * Intrument Name
   */
  @StringField({ isArray: false })
  @IsOptional()
  instname?: string;
  /**
   * ISIN
   */
  @StringField({ isArray: false })
  @IsOptional()
  isin?: string;
  /**
   * Tick Size
   */
  @NumberField({ isArray: false })
  @IsOptional()
  ti?: number;
  /**
   * Lot Size
   */
  @NumberField({ isArray: false })
  @IsOptional()
  ls?: number;
  /**
   * Price precision
   */
  @NumberField({ isArray: false })
  @IsOptional()
  pp?: number;
  /**
   * Multiplier
   */
  @NumberField({ isArray: false })
  @IsOptional()
  mult?: number;
  /**
   * Contract Token
   */
  @StringField({ isArray: false })
  @IsOptional()
  token?: string;
  /**
   * ((GN / GD) * (PN/PD))
   */
  @StringField({ isArray: false })
  @IsOptional()
  prcftr_d?: string;
  /**
   * Upper circuit limit
   */
  @NumberField({ isArray: false })
  @IsOptional()
  uc?: number;
  /**
   * Lower circuit limit
   */
  @NumberField({ isArray: false })
  @IsOptional()
  lc?: number;
  /**
   * LTP
   */
  @NumberField({ isArray: false })
  @IsOptional()
  lp?: number;
  /**
   * Day High Price
   */
  @NumberField({ isArray: false })
  @IsOptional()
  h?: number;
  /**
   * Day Low Price
   */
  @NumberField({ isArray: false })
  @IsOptional()
  l?: number;
  /**
   * Volume
   */
  @NumberField({ isArray: false })
  @IsOptional()
  v?: number;
  /**
   * Last trade quantity
   */
  @NumberField({ isArray: false })
  @IsOptional()
  ltq?: number;
  /**
   * Last trade time
   */
  @StringField({ isArray: false })
  @IsOptional()
  ltt?: string;
  /**
   * Best Buy Price
   */
  @NumberField({ isArray: false })
  @IsOptional()
  bp1?: number;
  /**
   * Best Sell Price
   */
  @NumberField({ isArray: false })
  @IsOptional()
  sp1?: number;
  /**
   * Best Buy Price
   */
  @NumberField({ isArray: false })
  @IsOptional()
  bp2?: number;
  /**
   * Best Sell Price
   */
  @NumberField({ isArray: false })
  @IsOptional()
  sp2?: number;
  /**
   * Best Buy Price
   */
  @NumberField({ isArray: false })
  @IsOptional()
  bp3?: number;
  /**
   * Best Sell Price
   */
  @NumberField({ isArray: false })
  @IsOptional()
  sp3?: number;
  /**
   * Best Buy Price
   */
  @NumberField({ isArray: false })
  @IsOptional()
  bp4?: number;
  /**
   * Best Sell Price
   */
  @NumberField({ isArray: false })
  @IsOptional()
  sp4?: number;
  /**
   * Best Buy Price
   */
  @NumberField({ isArray: false })
  @IsOptional()
  bp5?: number;
  /**
   * Best Sell Price
   */
  @NumberField({ isArray: false })
  @IsOptional()
  sp5?: number;
  /**
   * Best Buy Quantity
   */
  @NumberField({ isArray: false })
  @IsOptional()
  bq1?: number;
  /**
   * Best Sell Quantity
   */
  @NumberField({ isArray: false })
  @IsOptional()
  sq1?: number;
  /**
   * Best Buy Quantity
   */
  @NumberField({ isArray: false })
  @IsOptional()
  bq2?: number;
  /**
   * Best Sell Quantity
   */
  @NumberField({ isArray: false })
  @IsOptional()
  sq2?: number;
  /**
   * Best Buy Quantity
   */
  @NumberField({ isArray: false })
  @IsOptional()
  bq3?: number;
  /**
   * Best Sell Quantity
   */
  @NumberField({ isArray: false })
  @IsOptional()
  sq3?: number;
  /**
   * Best Buy Quantity
   */
  @NumberField({ isArray: false })
  @IsOptional()
  bq4?: number;
  /**
   * Best Sell Quantity
   */
  @NumberField({ isArray: false })
  @IsOptional()
  sq4?: number;
  /**
   * Best Buy Quantity
   */
  @NumberField({ isArray: false })
  @IsOptional()
  bq5?: number;
  /**
   * Best Sell Quantity
   */
  @NumberField({ isArray: false })
  @IsOptional()
  sq5?: number;
  /**
   * Best Buy Orders
   */
  @NumberField({ isArray: false })
  @IsOptional()
  bo1?: number;
  /**
   * Best Sell Orders
   */
  @NumberField({ isArray: false })
  @IsOptional()
  so1?: number;
  /**
   * Best Buy Orders
   */
  @NumberField({ isArray: false })
  @IsOptional()
  bo2?: number;
  /**
   * Best Sell Orders
   */
  @NumberField({ isArray: false })
  @IsOptional()
  so2?: number;
  /**
   * Best Buy Orders
   */
  @NumberField({ isArray: false })
  @IsOptional()
  bo3?: number;
  /**
   * Best Sell Orders
   */
  @NumberField({ isArray: false })
  @IsOptional()
  so3?: number;
  /**
   * Best Buy Orders
   */
  @NumberField({ isArray: false })
  @IsOptional()
  bo4?: number;
  /**
   * Best Sell Orders
   */
  @NumberField({ isArray: false })
  @IsOptional()
  so4?: number;
  /**
   * Best Buy Orders
   */
  @NumberField({ isArray: false })
  @IsOptional()
  bo5?: number;
  /**
   * Best Sell Orders
   */
  @NumberField({ isArray: false })
  @IsOptional()
  so5?: number;
}
