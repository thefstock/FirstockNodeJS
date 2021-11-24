/**
 * @module
 * Request and Response models for login
 */
import { IsDefined, IsEmail, IsIP, IsOptional, ValidateIf } from 'class-validator';

import {
  DateField,
  EnumField,
  Hashed,
  RequestSourceType,
  ResponseStatus,
  StringField,
  TimestampField
} from '../../../common';

/**
 * The data model for login request
 */
export class LoginRequestModel {
  /**
   * Application Version
   */
  @StringField()
  @IsDefined()
  apkversion: string;

  /**
   * User Id of the login user
   */
  @StringField()
  @IsDefined()
  uid: string;

  /**
   * password for login. It will be automatically hashed during the request
   */
  @Hashed()
  @StringField()
  @ValidateIf(o => o.dip === undefined)
  pwd?: string;
  /**
   * The device pin
   */
  @Hashed()
  @StringField()
  @ValidateIf(o => o.pwd === undefined)
  dpin?: string;
  /**
   * DOB or PAN
   */
  @StringField()
  @IsDefined()
  factor2: string;
  /**
   * Vendor code
   */
  @StringField()
  vc: string
  /**
   * Sha256 of uid|vendor_key
   */
  @StringField()
  appkey: string;
  /**
   * IMEI for mobile (If desktop it takes the MAC address)
   */
  @StringField()
  imei: string;
  /**
   * Value must be in below format:
   * iOS - iosInfo.utsname.machine - iosInfo.systemVersion
   * Android - androidInfo.model - androidInfo.version
   * examples:
   *  iOS - iPhone 8.0 - 9.0
   *  Android - Moto G - 9 PKQ1.181203.01
   */
  @StringField()
  @IsOptional()
  addldivinf: string;
  /**
   * The IP address of the system
   */
  @StringField()
  @IsOptional()
  @IsIP()
  ipaddr: string;
  /**
   * Access Type
   */
  @EnumField(RequestSourceType)
  @IsOptional()
  source: RequestSourceType = RequestSourceType.API;
}

/**
 * The data model for login response
 */
export class LoginResponseModel {
  /**
   * success or failure status
   */
  @EnumField(ResponseStatus)
  stat: ResponseStatus = ResponseStatus.OK
  /**
   * Present only on login success. This key is to be passed in subsequent requests
   */
  @StringField()
  @ValidateIf(o => o.stat === ResponseStatus.OK)
  susertoken?: string;
  /**
   * Present only on login success.
   */
  @TimestampField({ unix: true })
  @ValidateIf(o => o.stat === ResponseStatus.OK)
  lastaccesstime?: Date;
  /**
   * It will be present only on successful login.
   */
  @DateField()
  @ValidateIf(o => o.stat === ResponseStatus.OK)
  request_time?: Date;
  /**
   * If Y Mandatory password reset to be enforced. Otherwise the field will be absent.
   */
  @StringField()
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
  @StringField()
  @IsOptional()
  uname?: string;
  /**
   * Account id
   */
  @StringField()
  @IsOptional()
  actid?: string;
  /**
   * Email Id
   */
  @StringField()
  @IsEmail()
  @IsOptional()
  email?: string;
  /**
   * Broker Id
   */
  @StringField()
  @IsOptional()
  brkname?: string;
  /**
   * Error message if the login failed
   */
  @StringField()
  @IsOptional()
  emsg?: string;
}