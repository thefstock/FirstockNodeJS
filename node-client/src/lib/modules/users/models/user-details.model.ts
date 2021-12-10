import { IsEmail, IsOptional } from 'class-validator';

import {
  EnumField,
  Nested,
  Product,
  ResponseStatus,
  StringField,
  TimestampField,
} from '../../../common';

/**
 * The request model for user details
 * @category Models
 */
export class UserDetailsRequestModel {
  /**
   * The user id of the login user
   */
  @StringField({ isArray: false })
  uid: string;
}

/**
 * The response model for user details
 * @category Models
 */
export class UserDetailsResponseModel {
  /**
   * The logout success or failure status
   */
  @EnumField(ResponseStatus)
  stat: ResponseStatus;
  /**
   * List of strings with enabled exchange names
   */
  @StringField({ isArray: true })
  @IsOptional()
  exarr?: string[];
  /**
   * List of strings with enabled price types for user
   */
  @StringField({ isArray: true })
  @IsOptional()
  orarr?: string[];
  /**
   * List of Product Obj with enabled products, as defined below.
   */
  @Nested(Product, { isArray: true })
  @IsOptional()
  prarr?: Product[];
  /**
   * Broker Id
   */
  @StringField({ isArray: false })
  @IsOptional()
  brkname?: string;
  /**
   * Branch Id
   */
  @StringField({ isArray: false })
  @IsOptional()
  brnchid?: string;
  /**
   * Email Id
   */
  @StringField({ isArray: false })
  @IsOptional()
  @IsEmail()
  email?: string;
  /**
   * Account Id
   */
  @StringField({ isArray: false })
  @IsOptional()
  actid?: string;
  /**
   * Mobile Number
   */
  @StringField({ isArray: false })
  @IsOptional()
  m_num?: string;
  /**
   * Always it will be an INVESTOR, other types of user not allowed to login using this API.
   */
  @StringField({ isArray: false })
  @IsOptional()
  u_prev?: string;
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
}
