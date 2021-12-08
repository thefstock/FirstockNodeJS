/**
 * @module
 * The request and response models for
 *  */
import { IsEmail, IsOptional } from 'class-validator';

import {
  BankDetails,
  DateField,
  DpAccountNumber,
  EnumField,
  Nested,
  ResponseStatus,
  StringField,
  TimestampField,
} from '../../../common';

/**
 * The request model for client details
 */
export class ClientDetailsRequestModel {
  /**
   * The user id of the login user
   */
  @StringField({ isArray: false })
  uid: string;
  /**
   * Login users account ID
   */
  @StringField({ isArray: false })
  actid: string;
  /**
   * Login users broker ID
   */
  @StringField({ isArray: false })
  brkname: string;
}

/**
 * The response model for client details
 */
export class ClientDetailsResponseModel {
  /**
   * The logout success or failure status
   */
  @EnumField(ResponseStatus)
  stat: ResponseStatus;
  /**
   * Login users account ID
   */
  @StringField({ isArray: false })
  @IsOptional()
  actid?: string;
  /**
   * Creation date
   */
  @DateField('DD-MM-YYYY hh:mm:ss')
  @IsOptional()
  creatdte?: Date;
  /**
   * Creation time
   */
  @DateField('DD-MM-YYYY hh:mm:ss')
  @IsOptional()
  creattme?: Date;
  /**
   * Mobile number
   */
  @StringField({ isArray: false })
  @IsOptional()
  m_num?: string;
  /**
   * Email Id
   */
  @StringField({ isArray: false })
  @IsOptional()
  @IsEmail()
  email?: string;
  /**
   * The PAN of user
   */
  @StringField({ isArray: false })
  @IsOptional()
  pan?: string;
  /**
   * Address
   */
  @StringField({ isArray: false })
  @IsOptional()
  addr?: string;
  /**
   * Office address
   */
  @StringField({ isArray: false })
  @IsOptional()
  addroffice?: string;
  /**
   * City
   */
  @StringField({ isArray: false })
  @IsOptional()
  addrcity?: string;
  /**
   * State
   */
  @StringField({ isArray: false })
  @IsOptional()
  addrstate?: string;
  /**
   * List of bank details
   */
  @Nested(BankDetails, { isArray: true })
  @IsOptional()
  bankdetails?: BankDetails[];
  /**
   * List of bank
   */
  @Nested(DpAccountNumber, { isArray: true })
  @IsOptional()
  dp_acct_num?: DpAccountNumber[];
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
