import { IsOptional } from 'class-validator';

import {
  EnumField,
  Nested,
  ResponseStatus,
  StringField,
  TBContract,
  TimestampField,
} from '../../../common';

/**
 * The request model for top list
 * @category Models
 */
export class TopListRequestModel {
  /**
   * The user id of the login user
   */
  @StringField({ isArray: false })
  uid: string;
  /**
   * Exchange
   */
  @StringField({ isArray: false })
  exch: string;
  /**
   * T or B Top or Bottom
   */
  @StringField({ isArray: false })
  tb: string;
  /**
   * Basket name
   */
  @StringField({ isArray: false })
  bskt: string;
  /**
   * Criteria
   */
  @StringField({ isArray: false })
  crt: string;
}

/**
 * The response model for top list
 * @category Models
 */
export class TopListResponseModel {
  /**
   * The top list success or failure status
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
   * Array of top / bottom contracts object
   */
  @Nested(TBContract, { isArray: true })
  @IsOptional()
  values?: TBContract[];
  /**
   * Error message if the request failed
   */
  @StringField({ isArray: false })
  @IsOptional()
  emsg?: string;
}
