import { IsOptional } from 'class-validator';

import {
  EnumField,
  Nested,
  ResponseStatus,
  StringField,
  TimestampField,
} from '../../../common';

/**
 * basket
 */
export class Basket {
  /**
   * The basket
   */
  @StringField({ isArray: false })
  basket: string;
}

/**
 * The request model for get content basket
 * @category Models
 */
export class GetContentBasketRequestModel {
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
}

/**
 * The response model for get content basket
 * @category Models
 */
export class GetContentBasketResponseModel {
  /**
   * The get content basket success or failure status
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
   * List of baskets
   */
  @Nested(Basket, { isArray: true })
  @IsOptional()
  basketlists?: Basket[];
  /**
   * Error message if the request failed
   */
  @StringField({ isArray: false })
  @IsOptional()
  emsg?: string;
}
