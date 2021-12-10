import { IsOptional } from 'class-validator';

import {
  EnumField,
  Nested,
  ResponseStatus,
  StringField,
  TimestampField,
} from '../../../common';

/**
 * market option chain
 */
export class MarketOptionChain {
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
   * Option Type
   */
  @StringField({ isArray: false })
  @IsOptional()
  optt?: string;
  /**
   * Strike price
   */
  @StringField({ isArray: false })
  @IsOptional()
  strprc?: string;
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
}

/**
 * The request model for get option chain
 * @category Models
 */
export class GetOptionChainRequestModel {
  /**
   * The user id of the login user
   */
  @StringField({ isArray: false })
  uid: string;
  /**
   *
    Trading symbol of any of the option or future. Option chain for that underlying will be returned.
    (use url encoding to avoid special char error for symbols like M&M)
    
  */
  @StringField({ isArray: false })
  tsym: string;
  /**
   * Exchange
   */
  @StringField({ isArray: false })
  exch: string;
  /**
   * Mid price for option chain selection
   */
  @StringField({ isArray: false })
  strprc: string;
  /**
   *
    Number of strike to return on one side of the mid price for PUT and CALL.
    (example cnt is 4, total 16 contracts will be returned, if cnt is is 5 total 20 contract will be returned)
    
  */
  @StringField({ isArray: false })
  cnt: string;
}

/**
 * The response model for get option chain
 * @category Models
 */
export class GetOptionChainResponseModel {
  /**
   * The get option chain success or failure status
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
   * List of items
   */
  @Nested(MarketOptionChain, { isArray: true })
  @IsOptional()
  values?: MarketOptionChain[];
  /**
   * Error message if the request failed
   */
  @StringField({ isArray: false })
  @IsOptional()
  emsg?: string;
}
