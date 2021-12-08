/**
 * @module
 * The request and response models for
 *  */
import { IsEmail, IsIP, IsOptional } from 'class-validator';

import {
  DateField,
  EnumField,
  Hashed,
  RequestSourceType,
  ResponseStatus,
  StringField,
  TimestampField,
} from '../../../common';

/**
 * The request model for login
 */
export class LoginRequestModel {
  /**
   * Application Version
   */
  @StringField({ isArray: false })
  apkversion: string;
  /**
   * User Id of the login user
   */
  @StringField({ isArray: false })
  uid: string;
  /**
   * password for login. It will be automatically hashed during the request
   */
  @StringField({ isArray: false })
  @IsOptional()
  @Hashed()
  pwd?: string;
  /**
   * The device pin
   */
  @StringField({ isArray: false })
  @IsOptional()
  @Hashed()
  dpin?: string;
  /**
   * DOB or PAN
   */
  @StringField({ isArray: false })
  factor2: string;
  /**
   * Vendor code
   */
  @StringField({ isArray: false })
  vc: string;
  /**
   * Sha256 of uid|vendor_key
   */
  @StringField({ isArray: false })
  appkey: string;
  /**
   * IMEI for mobile (If desktop it takes the MAC address)
   */
  @StringField({ isArray: false })
  imei: string;
  /**
     *
      Value must be in below format:
        iOS - iosInfo.utsname.machine - iosInfo.systemVersion
        Android - androidInfo.model - androidInfo.version
      examples:
        iOS - iPhone 8.0 - 9.0
        Android - Moto G - 9 PKQ1.181203.01

    */
  @StringField({ isArray: false })
  @IsOptional()
  addldivinf?: string;
  /**
   * The IP address of the system
   */
  @StringField()
  @IsIP()
  @IsOptional()
  ipaddr?: string;
  /**
   * Access Type
   */
  @EnumField(RequestSourceType)
  @IsOptional()
  source?: RequestSourceType;
}

/**
 * The response model for login
 */
export class LoginResponseModel {
  /**
   * Login success or failure status
   */
  @EnumField(ResponseStatus)
  stat: ResponseStatus;
  /**
   * Present only on login success. This key is to be passed in subsequent requests
   */
  @StringField({ isArray: false })
  @IsOptional()
  susertoken?: string;
  /**
   * Present only on login success.
   */
  @DateField('DD-MM-YYYY hh:mm:ss')
  @IsOptional()
  lastaccesstime?: Date;
  /**
   * It will be present only on successful login.
   */
  @TimestampField()
  @IsOptional()
  request_time?: Date;
  /**
   * If Y Mandatory password reset to be enforced. Otherwise the field will be absent.
   */
  @StringField({ isArray: false })
  @IsOptional()
  spasswordreset?: string;
  /**
   * list of strings with enabled exchange names
   */
  @StringField({ isArray: true })
  @IsOptional()
  exarr?: string[];
  /**
   * Username
   */
  @StringField({ isArray: false })
  @IsOptional()
  uname?: string;
  /**
   * Account Id
   */
  @StringField({ isArray: false })
  @IsOptional()
  actid?: string;
  /**
   * Email Id
   */
  @StringField({ isArray: false })
  @IsOptional()
  @IsEmail()
  email?: string;
  /**
   * Broker Id
   */
  @StringField({ isArray: false })
  @IsOptional()
  brkname?: string;
  /**
   * Error message if the login failed
   */
  @StringField({ isArray: false })
  @IsOptional()
  emsg?: string;
}
