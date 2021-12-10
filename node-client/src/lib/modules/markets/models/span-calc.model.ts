import { IsOptional } from 'class-validator';

import {
  EnumField,
  Nested,
  NumberField,
  ResponseStatus,
  StringField,
  TimestampField,
} from '../../../common';

/**
 * span calculator pos
 */
export class SpanCalculatorPos {
  /**
   * Exchange
   */
  @StringField({ isArray: false })
  @IsOptional()
  exch?: string;
  /**
   * Instrument name
   */
  @StringField({ isArray: false })
  @IsOptional()
  instname?: string;
  /**
   * Symbol name
   */
  @StringField({ isArray: false })
  @IsOptional()
  symname?: string;
  /**
   * expiry date
   */
  @TimestampField()
  @IsOptional()
  expd?: Date;
  /**
   * Option Type
   */
  @StringField({ isArray: false })
  @IsOptional()
  optt?: string;
  /**
   * Strike price
   */
  @NumberField({ isArray: false })
  @IsOptional()
  strprc?: number;
  /**
   * Buy Open Quantity
   */
  @NumberField({ isArray: false })
  @IsOptional()
  buyqty?: number;
  /**
   * Sell Open Quantity
   */
  @NumberField({ isArray: false })
  @IsOptional()
  sellqty?: number;
  /**
   * Net traded quantity
   */
  @NumberField({ isArray: false })
  @IsOptional()
  netqty?: number;
}

/**
 * The request model for span calc
 * @category Models
 */
export class SpanCalcRequestModel {
  /**
   * Any Account id, preferably actual account id if sending from post login screen
   */
  @StringField({ isArray: false })
  actid: string;
  /**
   * Array of SpanCalculatorPos
   */
  @Nested(SpanCalculatorPos, { isArray: true })
  pos: SpanCalculatorPos[];
}

/**
 * The response model for span calc
 * @category Models
 */
export class SpanCalcResponseModel {
  /**
   * The span calculator success or failure status
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
   * Span value
   */
  @StringField({ isArray: false })
  @IsOptional()
  span?: string;
  /**
   * Exposure margin
   */
  @StringField({ isArray: false })
  @IsOptional()
  expo?: string;
  /**
   * Span value ignoring input fields buyqty, sellqty
   */
  @StringField({ isArray: false })
  @IsOptional()
  span_trade?: string;
  /**
   * Exposure margin ignoring input fields buyqty, sellqty
   */
  @StringField({ isArray: false })
  @IsOptional()
  expo_trade?: string;
  /**
   * Error message if the request failed
   */
  @StringField({ isArray: false })
  @IsOptional()
  emsg?: string;
}
