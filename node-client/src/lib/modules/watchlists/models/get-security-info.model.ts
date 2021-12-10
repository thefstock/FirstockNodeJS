import { IsOptional } from 'class-validator';

import {
  EnumField,
  NumberField,
  ResponseStatus,
  StringField,
  TimestampField,
} from '../../../common';

/**
 * The request model for get security info
 * @category Models
 */
export class GetSecurityInfoRequestModel {
  /**
   * The user id of the login user
   */
  @StringField({ isArray: false })
  uid: string;
  /**
   * Exchange
   */
  @StringField({ isArray: false })
  @IsOptional()
  exch?: string;
  /**
   * Contract Token
   */
  @StringField({ isArray: false })
  @IsOptional()
  token?: string;
}

/**
 * The response model for get security info
 * @category Models
 */
export class GetSecurityInfoResponseModel {
  /**
   * The get security info success or failure status
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
   * Error message if the request failed
   */
  @StringField({ isArray: false })
  @IsOptional()
  emsg?: string;
  /**
   * Exchange
   */
  @StringField({ isArray: false })
  @IsOptional()
  exch?: string;
  /**
   * Trading Symbol
   */
  @StringField({ isArray: false })
  @IsOptional()
  tsym?: string;
  /**
   * Company Name
   */
  @StringField({ isArray: false })
  @IsOptional()
  cname?: string;
  /**
   * Symbol Name
   */
  @StringField({ isArray: false })
  @IsOptional()
  symnam?: string;
  /**
   * Segment
   */
  @StringField({ isArray: false })
  @IsOptional()
  seg?: string;
  /**
   * Expiry Date
   */
  @StringField({ isArray: false })
  @IsOptional()
  exd?: string;
  /**
   * Intrument Name
   */
  @StringField({ isArray: false })
  @IsOptional()
  instname?: string;
  /**
   * Strike Price
   */
  @StringField({ isArray: false })
  @IsOptional()
  strprc?: string;
  /**
   * Option Type
   */
  @StringField({ isArray: false })
  @IsOptional()
  optt?: string;
  /**
   * ISIN
   */
  @StringField({ isArray: false })
  @IsOptional()
  isin?: string;
  /**
   * Tick Size
   */
  @NumberField({ isArray: false })
  @IsOptional()
  ti?: number;
  /**
   * Lot Size
   */
  @NumberField({ isArray: false })
  @IsOptional()
  ls?: number;
  /**
   * Price precision
   */
  @NumberField({ isArray: false })
  @IsOptional()
  pp?: number;
  /**
   * Multiplier
   */
  @NumberField({ isArray: false })
  @IsOptional()
  mult?: number;
  /**
   * gn/gd * pn/pd
   */
  @StringField({ isArray: false })
  @IsOptional()
  gp_nd?: string;
  /**
   * Price Units
   */
  @NumberField({ isArray: false })
  @IsOptional()
  prcunt?: number;
  /**
   * Price Quote Qty
   */
  @NumberField({ isArray: false })
  @IsOptional()
  prcqqty?: number;
  /**
   * Trade Units
   */
  @StringField({ isArray: false })
  @IsOptional()
  trdunt?: string;
  /**
   * Delivery Units
   */
  @StringField({ isArray: false })
  @IsOptional()
  delunt?: string;
  /**
   * Freeze Qty
   */
  @NumberField({ isArray: false })
  @IsOptional()
  frzqty?: number;
  /**
   * scripupdate Gsm Ind
   */
  @StringField({ isArray: false })
  @IsOptional()
  gsmind?: string;
  /**
   * Elm Buy Margin
   */
  @StringField({ isArray: false })
  @IsOptional()
  elmbmrg?: string;
  /**
   * Elm Sell Margin
   */
  @StringField({ isArray: false })
  @IsOptional()
  elmsmrg?: string;
  /**
   * Additional Long Margin
   */
  @StringField({ isArray: false })
  @IsOptional()
  addbmrg?: string;
  /**
   * Additional Short Margin
   */
  @StringField({ isArray: false })
  @IsOptional()
  addsmrg?: string;
  /**
   * Special Long Margin
   */
  @StringField({ isArray: false })
  @IsOptional()
  splbmrg?: string;
  /**
   * Special Short Margin
   */
  @StringField({ isArray: false })
  @IsOptional()
  splsmrg?: string;
  /**
   * Delivery Margin
   */
  @StringField({ isArray: false })
  @IsOptional()
  delmrg?: string;
  /**
   * Tender Margin
   */
  @StringField({ isArray: false })
  @IsOptional()
  tenmrg?: string;
  /**
   * Tender Start Date
   */
  @StringField({ isArray: false })
  @IsOptional()
  tenstrd?: string;
  /**
   * Tender End Eate
   */
  @StringField({ isArray: false })
  @IsOptional()
  tenendd?: string;
  /**
   * Exercise Start Date
   */
  @StringField({ isArray: false })
  @IsOptional()
  exestrd?: string;
  /**
   * Exercise End Date
   */
  @StringField({ isArray: false })
  @IsOptional()
  exeendd?: string;
  /**
   * Elm Margin
   */
  @StringField({ isArray: false })
  @IsOptional()
  elmmrg?: string;
  /**
   * Var Margin
   */
  @StringField({ isArray: false })
  @IsOptional()
  varmrg?: string;
  /**
   * Exposure Margin
   */
  @StringField({ isArray: false })
  @IsOptional()
  expmrg?: string;
  /**
   * Contract Token
   */
  @StringField({ isArray: false })
  @IsOptional()
  token?: string;
  /**
   * ((GN / GD) * (PN/PD))
   */
  @StringField({ isArray: false })
  @IsOptional()
  prcftr_d?: string;
}
