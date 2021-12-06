/**
 * @module
 * The request and response models for 
 */
import { IsOptional } from 'class-validator';

import { DateField, EnumField, Nested, ResponseStatus, StringField } from '../../../common';

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
  @DateField("DD-MM-YYYY hh:mm:ss")
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
