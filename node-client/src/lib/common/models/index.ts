/**
 * @module
 * common models used across the project
 *  */

import { IsOptional } from 'class-validator';

import { EnumField, NumberField, PriceType, StringField, TimestampField, TransactionType } from '../';

/**
 * The alert type model model
*/
export class AlertTypeModel {
  /**
   * Alert type
  */
  @StringField({ isArray: false })
  ai_t: string;
}

/**
 * The product model
*/
export class Product {
  /**
   * The product name
  */
  @StringField({ isArray: false })
  prd: string;
  /**
   * The product display name
  */
  @StringField({ isArray: false })
  s_prdt_ali: string;
  /**
   * List of strings with enabled, allowed exchange names
  */
  @StringField({ isArray: true })
  exch: string[];
}

/**
 * The bank details model
*/
export class BankDetails {
  /**
   * Bank Name
  */
  @StringField({ isArray: false })
  @IsOptional()
  bankn?: string;
  /**
   * Account Number
  */
  @StringField({ isArray: false })
  @IsOptional()
  acctnum?: string;
}

/**
 * The dp account number model
*/
export class DpAccountNumber {
  /**
   * The dpnum property
  */
  @StringField({ isArray: false })
  @IsOptional()
  dpnum?: string;
}

/**
 * The scrip model
*/
export class Scrip {
  /**
   * Exchange
  */
  @StringField({ isArray: false })
  @IsOptional()
  exch?: string;
  /**
   * Trading symbol of the scrip (contract)
  */
  @StringField({ isArray: false })
  @IsOptional()
  tsym?: string;
  /**
   * Token of the scrip (contract)
  */
  @StringField({ isArray: false })
  @IsOptional()
  token?: string;
  /**
   * Price precision
  */
  @NumberField({ isArray: false })
  @IsOptional()
  pp?: number;
  /**
   * Tick size
  */
  @NumberField({ isArray: false })
  @IsOptional()
  ti?: number;
  /**
   * Lot size
  */
  @NumberField({ isArray: false })
  @IsOptional()
  ls?: number;
}

/**
 * The basket list model
*/
export class BasketList {
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
   * LMT / MKT / SL-LMT/ SL-MKT
  */
  @EnumField(PriceType)
  prctyp: PriceType;
}

/**
 * The index token pair model
*/
export class IndexTokenPair {
  /**
   * The index name
  */
  @StringField({ isArray: false })
  idxname: string;
  /**
   * Index token used to subscribe
  */
  @StringField({ isArray: false })
  token: string;
}

/**
 * The basket criteria pair model
*/
export class BasketCriteriaPair {
  /**
   * The basket name
  */
  @StringField({ isArray: false })
  bskt: string;
  /**
   * The criteria
  */
  @StringField({ isArray: false })
  crt: string;
}

/**
 * The tb contract model
*/
export class TBContract {
  /**
   * Trading symbol
  */
  @StringField({ isArray: false })
  @IsOptional()
  tsym?: string;
  /**
   * LTP
  */
  @StringField({ isArray: false })
  @IsOptional()
  lp?: string;
  /**
   * Previous Close price
  */
  @StringField({ isArray: false })
  @IsOptional()
  c?: string;
  /**
   * volume
  */
  @StringField({ isArray: false })
  @IsOptional()
  v?: string;
  /**
   * Total traded value
  */
  @StringField({ isArray: false })
  @IsOptional()
  value?: string;
  /**
   * Open interest
  */
  @StringField({ isArray: false })
  @IsOptional()
  oi?: string;
  /**
   * LTP percentage change
  */
  @StringField({ isArray: false })
  @IsOptional()
  pc?: string;
}

/**
 * The trade date model
*/
export class TradeDate {
  /**
   * The trd date property
  */
  @TimestampField()
  trd_date: Date;
}

/**
 * The exch tsym model
*/
export class ExchTsym {
  /**
   * NSE, BSE, NFO ... Exchange
  */
  @StringField({ isArray: false })
  @IsOptional()
  exch?: string;
  /**
   * Trading symbol of the scrip (contract)
  */
  @StringField({ isArray: false })
  @IsOptional()
  tsym?: string;
  /**
   * Token of the scrip (contract)
  */
  @StringField({ isArray: false })
  @IsOptional()
  token?: string;
  /**
   * Price precision
  */
  @StringField({ isArray: false })
  @IsOptional()
  pp?: string;
  /**
   * Tick size
  */
  @NumberField({ isArray: false })
  @IsOptional()
  ti?: number;
  /**
   * Lot size
  */
  @NumberField({ isArray: false })
  @IsOptional()
  ls?: number;
}

