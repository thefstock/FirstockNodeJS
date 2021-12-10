import { IsOptional } from 'class-validator';

import {
  AlertType,
  AlertValidity,
  EnumField,
  PriceType,
  RetentionType,
  StringField,
  TimestampField,
  TransactionType,
} from '../../../common';

/**
 * The request model for place gtt order
 * @category Models
 */
export class PlaceGttOrderRequestModel {
  /**
   * The user id of the login user
   */
  @StringField({ isArray: false })
  uid: string;
  /**
   * Trading symbol
   */
  @StringField({ isArray: false })
  tsym: string;
  /**
   * Exchange Segment
   */
  @StringField({ isArray: false })
  exch: string;
  /**
   * Alert Type
   */
  @EnumField(AlertType)
  ai_t: AlertType;
  /**
   * DAY or GTT Validity
   */
  @EnumField(AlertValidity)
  validity: AlertValidity;
  /**
   * Any message Entered during order entry.
   */
  @StringField({ isArray: false })
  remarks: string;
  /**
   * Data to be compared with LTP
   */
  @StringField({ isArray: false })
  d: string;
  /**
   * Transaction type
   */
  @EnumField(TransactionType)
  trantype: TransactionType;
  /**
   * Price type
   */
  @EnumField(PriceType)
  prctyp: PriceType;
  /**
   * The product name
   */
  @StringField({ isArray: false })
  prd: string;
  /**
   * Retention type
   */
  @EnumField(RetentionType)
  ret: RetentionType;
  /**
   * Login user account id
   */
  @StringField({ isArray: false })
  actid: string;
  /**
   * Order price
   */
  @StringField({ isArray: false })
  prc: string;
  /**
   * Order quantity
   */
  @StringField({ isArray: false })
  qty: string;
  /**
   * Disclosed quantity (Max 10% for NSE, and 50% for MCX)
   */
  @StringField({ isArray: false })
  @IsOptional()
  dscqty?: string;
}

/**
 * The response model for place gtt order
 * @category Models
 */
export class PlaceGttOrderResponseModel {
  /**
   * The place gtt order success or failure status
   */
  @StringField({ isArray: false })
  stat: string;
  /**
   * It will be present only on successful response.
   */
  @TimestampField()
  @IsOptional()
  request_time?: Date;
  /**
   * Alert Id
   */
  @StringField({ isArray: false })
  @IsOptional()
  al_id?: string;
  /**
   * Error message if the request failed
   */
  @StringField({ isArray: false })
  @IsOptional()
  emsg?: string;
}
