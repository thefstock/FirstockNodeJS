/**
 * @module
 * The request and response models for
 *  */
import { IsOptional } from 'class-validator';

import {
  EnumField,
  ExchTsym,
  Nested,
  NumberField,
  ResponseStatus,
  StringField,
  TimestampField,
} from '../../../common';

/**
 * The request model for holdings
 */
export class HoldingsRequestModel {
  /**
   * The user id of the login user
   */
  @StringField({ isArray: false })
  uid: string;
  /**
   * Account id of the logged in user.
   */
  @StringField({ isArray: false })
  actid: string;
  /**
   * Product name
   */
  @StringField({ isArray: false })
  prd: string;
}

/**
 * The response model for holdings
 */
export class HoldingsResponseModel {
  /**
   * The holdings success or failure status
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
   * Array of objects exch_tsym objects as defined below.
   */
  @Nested(ExchTsym, { isArray: true })
  @IsOptional()
  exch_tsym?: ExchTsym[];
  /**
   * Holding quantity
   */
  @NumberField({ isArray: false })
  @IsOptional()
  holdqty?: number;
  /**
   * DP Holding quantity
   */
  @NumberField({ isArray: false })
  @IsOptional()
  dpqty?: number;
  /**
   * Non Poa display quantity
   */
  @NumberField({ isArray: false })
  @IsOptional()
  npoadqty?: number;
  /**
   * Collateral quantity
   */
  @NumberField({ isArray: false })
  @IsOptional()
  colqty?: number;
  /**
   * Beneficiary quantity
   */
  @NumberField({ isArray: false })
  @IsOptional()
  benqty?: number;
  /**
   * Unpledged quantity
   */
  @NumberField({ isArray: false })
  @IsOptional()
  unplgdqty?: number;
  /**
   * Broker Collateral
   */
  @NumberField({ isArray: false })
  @IsOptional()
  brkcolqty?: number;
  /**
   * BTST quantity
   */
  @NumberField({ isArray: false })
  @IsOptional()
  btstqty?: number;
  /**
   * BTST Collateral quantity
   */
  @NumberField({ isArray: false })
  @IsOptional()
  btstcolqty?: number;
  /**
   * Holding used today
   */
  @NumberField({ isArray: false })
  @IsOptional()
  usedqty?: number;
  /**
   * Average price uploaded along with holdings
   */
  @NumberField({ isArray: false })
  @IsOptional()
  upldprc?: number;
  /**
   * Error message if the request failed
   */
  @StringField({ isArray: false })
  @IsOptional()
  emsg?: string;
}
