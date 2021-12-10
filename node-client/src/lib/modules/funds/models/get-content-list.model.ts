import { IsOptional } from 'class-validator';

import {
  EnumField,
  NumberField,
  ResponseStatus,
  StringField,
  TimestampField,
} from '../../../common';

/**
 * The request model for get content list
 * @category Models
 */
export class GetContentListRequestModel {
  /**
   * The user id of the login user
   */
  @StringField({ isArray: false })
  uid: string;
  /**
   * Exchange Name
   */
  @StringField({ isArray: false })
  exch: string;
  /**
   * Condition list
   */
  @StringField({ isArray: false })
  condition_name: string;
  /**
   * Basket Name
   */
  @StringField({ isArray: false })
  @IsOptional()
  basket?: string;
}

/**
 * The response model for get content list
 * @category Models
 */
export class GetContentListResponseModel {
  /**
   * The get content list success or failure status
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
   * LTP
   */
  @NumberField({ isArray: false })
  @IsOptional()
  lp?: number;
  /**
   * Close price
   */
  @NumberField({ isArray: false })
  @IsOptional()
  c?: number;
  /**
   * High price
   */
  @NumberField({ isArray: false })
  @IsOptional()
  h?: number;
  /**
   * Low price
   */
  @NumberField({ isArray: false })
  @IsOptional()
  l?: number;
  /**
   * Average trade price
   */
  @NumberField({ isArray: false })
  @IsOptional()
  ap?: number;
  /**
   * Volume
   */
  @NumberField({ isArray: false })
  @IsOptional()
  v?: number;
  /**
   * Last trade time
   */
  @StringField({ isArray: false })
  @IsOptional()
  ltt?: string;
  /**
   * Percentage change
   */
  @NumberField({ isArray: false })
  @IsOptional()
  pc?: number;
  /**
   * Error message if the request failed
   */
  @StringField({ isArray: false })
  @IsOptional()
  emsg?: string;
}
