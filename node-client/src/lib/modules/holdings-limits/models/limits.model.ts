import { IsOptional } from 'class-validator';

import {
  EnumField,
  NumberField,
  ResponseStatus,
  StringField,
  TimestampField,
} from '../../../common';

/**
 * The request model for limits
 * @category Models
 */
export class LimitsRequestModel {
  /**
   * The user id of the login user
   */
  @StringField({ isArray: false })
  uid: string;
  /**
   * Account id of the logged in user.
   */
  @StringField({ isArray: false })
  actid: string;
  /**
   * Product name
   */
  @StringField({ isArray: false })
  @IsOptional()
  prd?: string;
  /**
   * Exchange
   */
  @StringField({ isArray: false })
  @IsOptional()
  exch?: string;
  /**
   * CM / FO / FX - Segment
   */
  @StringField({ isArray: false })
  @IsOptional()
  seg?: string;
}

/**
 * The response model for limits
 * @category Models
 */
export class LimitsResponseModel {
  /**
   * The limits success or failure status
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
   * Account id of the logged in user.
   */
  @StringField({ isArray: false })
  @IsOptional()
  actid?: string;
  /**
   * Product name
   */
  @StringField({ isArray: false })
  @IsOptional()
  prd?: string;
  /**
   * Exchange
   */
  @StringField({ isArray: false })
  @IsOptional()
  exch?: string;
  /**
   * CM / FO / FX - Segment
   */
  @StringField({ isArray: false })
  @IsOptional()
  seg?: string;
  /**
   * Cash Margin available
   */
  @NumberField({ isArray: false })
  @IsOptional()
  cash?: number;
  /**
   * Total Amount transferred using Pay ins today
   */
  @NumberField({ isArray: false })
  @IsOptional()
  payin?: number;
  /**
   * Total amount requested for withdrawal today
   */
  @NumberField({ isArray: false })
  @IsOptional()
  payout?: number;
  /**
   * Prevalued Collateral Amount
   */
  @NumberField({ isArray: false })
  @IsOptional()
  brkcollamt?: number;
  /**
   * Uncleared Cash (Pay in through cheques)
   */
  @NumberField({ isArray: false })
  @IsOptional()
  unclearedcash?: number;
  /**
   * Additional leverage amount / Amount added to handle system errors - by broker.
   */
  @NumberField({ isArray: false })
  @IsOptional()
  daycash?: number;
  /**
   * Total margin / fund used today
   */
  @NumberField({ isArray: false })
  @IsOptional()
  marginused?: number;
  /**
   * Mtom current percentage
   */
  @StringField({ isArray: false })
  @IsOptional()
  mtomcurper?: string;
  /**
   * CAC Buy used
   */
  @StringField({ isArray: false })
  @IsOptional()
  cbu?: string;
  /**
   * CAC Sell Credits
   */
  @StringField({ isArray: false })
  @IsOptional()
  csc?: string;
  /**
   * Current realized PNL
   */
  @StringField({ isArray: false })
  @IsOptional()
  rpnl?: string;
  /**
   * Current unrealized mtom
   */
  @StringField({ isArray: false })
  @IsOptional()
  unmtom?: string;
  /**
   * Covered Product margins
   */
  @StringField({ isArray: false })
  @IsOptional()
  marprt?: string;
  /**
   * Span used
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
   * Premium used
   */
  @StringField({ isArray: false })
  @IsOptional()
  premium?: string;
  /**
   * Var Elm Margin
   */
  @StringField({ isArray: false })
  @IsOptional()
  varelm?: string;
  /**
   * Gross Exposure
   */
  @StringField({ isArray: false })
  @IsOptional()
  grexpo?: string;
  /**
   * Gross Exposure derivative
   */
  @StringField({ isArray: false })
  @IsOptional()
  greexpo_d?: string;
  /**
   * Scrip basket margin
   */
  @StringField({ isArray: false })
  @IsOptional()
  scripbskmar?: string;
  /**
   * Additional scrip basket margin
   */
  @StringField({ isArray: false })
  @IsOptional()
  addscripbskmrg?: string;
  /**
   * Brokerage amount
   */
  @StringField({ isArray: false })
  @IsOptional()
  brokerage?: string;
  /**
   * Collateral calculated based on uploaded holdings
   */
  @StringField({ isArray: false })
  @IsOptional()
  collateral?: string;
  /**
   * Valuation of uploaded holding pre haircut
   */
  @StringField({ isArray: false })
  @IsOptional()
  grcoll?: string;
  /**
   * Turnover Limit
   */
  @StringField({ isArray: false })
  @IsOptional()
  turnoverlmt?: string;
  /**
   * Pending order value limit
   */
  @StringField({ isArray: false })
  @IsOptional()
  pendordvallmt?: string;
  /**
   * Turnover
   */
  @StringField({ isArray: false })
  @IsOptional()
  turnover?: string;
  /**
   * Pending Order value
   */
  @StringField({ isArray: false })
  @IsOptional()
  pendordval?: string;
  /**
   * Current realized PNL (Equity Intraday)
   */
  @StringField({ isArray: false })
  @IsOptional()
  rzpnl_e_i?: string;
  /**
   * Current realized PNL (Equity Margin)
   */
  @StringField({ isArray: false })
  @IsOptional()
  rzpnl_e_m?: string;
  /**
   * Current realized PNL (Equity Cash n Carry)
   */
  @StringField({ isArray: false })
  @IsOptional()
  rzpnl_e_c?: string;
  /**
   * Current realized PNL (Derivative Intraday)
   */
  @StringField({ isArray: false })
  @IsOptional()
  rzpnl_d_i?: string;
  /**
   * Current realized PNL (Derivative Margin)
   */
  @StringField({ isArray: false })
  @IsOptional()
  rzpnl_d_m?: string;
  /**
   * Current realized PNL (FX Intraday)
   */
  @StringField({ isArray: false })
  @IsOptional()
  rzpnl_f_i?: string;
  /**
   * Current realized PNL (FX Margin)
   */
  @StringField({ isArray: false })
  @IsOptional()
  rzpnl_f_m?: string;
  /**
   * Current realized PNL (Commodity Intraday)
   */
  @StringField({ isArray: false })
  @IsOptional()
  rzpnl_c_i?: string;
  /**
   * Current realized PNL (Commodity Margin)
   */
  @StringField({ isArray: false })
  @IsOptional()
  rzpnl_c_m?: string;
  /**
   * Current unrealized MTOM (Equity Intraday)
   */
  @StringField({ isArray: false })
  @IsOptional()
  uzpnl_e_i?: string;
  /**
   * Current unrealized MTOM (Equity Margin)
   */
  @StringField({ isArray: false })
  @IsOptional()
  uzpnl_e_m?: string;
  /**
   * Current unrealized MTOM (Equity Cash n Carry)
   */
  @StringField({ isArray: false })
  @IsOptional()
  uzpnl_e_c?: string;
  /**
   * Current unrealized MTOM (Derivative Intraday)
   */
  @StringField({ isArray: false })
  @IsOptional()
  uzpnl_d_i?: string;
  /**
   * Current unrealized MTOM (Derivative Margin)
   */
  @StringField({ isArray: false })
  @IsOptional()
  uzpnl_d_m?: string;
  /**
   * Current unrealized MTOM (FX Intraday)
   */
  @StringField({ isArray: false })
  @IsOptional()
  uzpnl_f_i?: string;
  /**
   * Current unrealized MTOM (FX Margin)
   */
  @StringField({ isArray: false })
  @IsOptional()
  uzpnl_f_m?: string;
  /**
   * Current unrealized MTOM (Commodity Intraday)
   */
  @StringField({ isArray: false })
  @IsOptional()
  uzpnl_c_i?: string;
  /**
   * Current unrealized MTOM (Commodity Margin)
   */
  @StringField({ isArray: false })
  @IsOptional()
  uzpnl_c_m?: string;
  /**
   * Span Margin (Derivative Intraday)
   */
  @StringField({ isArray: false })
  @IsOptional()
  span_d_i?: string;
  /**
   * Span Margin (Derivative Margin)
   */
  @StringField({ isArray: false })
  @IsOptional()
  span_d_m?: string;
  /**
   * Span Margin (FX Intraday)
   */
  @StringField({ isArray: false })
  @IsOptional()
  span_f_i?: string;
  /**
   * Span Margin (FX Margin)
   */
  @StringField({ isArray: false })
  @IsOptional()
  span_f_m?: string;
  /**
   * Span Margin (Commodity Intraday)
   */
  @StringField({ isArray: false })
  @IsOptional()
  span_c_i?: string;
  /**
   * Span Margin (Commodity Margin)
   */
  @StringField({ isArray: false })
  @IsOptional()
  span_c_m?: string;
  /**
   * Exposure Margin (Derivative Intraday)
   */
  @StringField({ isArray: false })
  @IsOptional()
  expo_d_i?: string;
  /**
   * Exposure Margin (Derivative Margin)
   */
  @StringField({ isArray: false })
  @IsOptional()
  expo_d_m?: string;
  /**
   * Exposure Margin (FX Intraday)
   */
  @StringField({ isArray: false })
  @IsOptional()
  expo_f_i?: string;
  /**
   * Exposure Margin (FX Margin)
   */
  @StringField({ isArray: false })
  @IsOptional()
  expo_f_m?: string;
  /**
   * Exposure Margin (Commodity Intraday)
   */
  @StringField({ isArray: false })
  @IsOptional()
  expo_c_i?: string;
  /**
   * Exposure Margin (Commodity Margin)
   */
  @StringField({ isArray: false })
  @IsOptional()
  expo_c_m?: string;
  /**
   * Option premium (Derivative Intraday)
   */
  @StringField({ isArray: false })
  @IsOptional()
  premium_d_i?: string;
  /**
   * Option premium (Derivative Margin)
   */
  @StringField({ isArray: false })
  @IsOptional()
  premium_d_m?: string;
  /**
   * Option premium (FX Intraday)
   */
  @StringField({ isArray: false })
  @IsOptional()
  premium_f_i?: string;
  /**
   * Option premium (FX Margin)
   */
  @StringField({ isArray: false })
  @IsOptional()
  premium_f_m?: string;
  /**
   * Option premium (Commodity Intraday)
   */
  @StringField({ isArray: false })
  @IsOptional()
  premium_c_i?: string;
  /**
   * Option premium (Commodity Margin)
   */
  @StringField({ isArray: false })
  @IsOptional()
  premium_c_m?: string;
  /**
   * Var Elm (Equity Intraday)
   */
  @StringField({ isArray: false })
  @IsOptional()
  varelm_e_i?: string;
  /**
   * Var Elm (Equity Margin)
   */
  @StringField({ isArray: false })
  @IsOptional()
  varelm_e_m?: string;
  /**
   * Var Elm (Equity Cash n Carry)
   */
  @StringField({ isArray: false })
  @IsOptional()
  varelm_e_c?: string;
  /**
   * Covered Product margins (Equity High leverage)
   */
  @StringField({ isArray: false })
  @IsOptional()
  marprt_e_h?: string;
  /**
   * Covered Product margins (Equity Bracket Order)
   */
  @StringField({ isArray: false })
  @IsOptional()
  marprt_e_b?: string;
  /**
   * Covered Product margins (Derivative High leverage)
   */
  @StringField({ isArray: false })
  @IsOptional()
  marprt_d_h?: string;
  /**
   * Covered Product margins (Derivative Bracket Order)
   */
  @StringField({ isArray: false })
  @IsOptional()
  marprt_d_b?: string;
  /**
   * Covered Product margins (FX High leverage)
   */
  @StringField({ isArray: false })
  @IsOptional()
  marprt_f_h?: string;
  /**
   * Covered Product margins (FX Bracket Order)
   */
  @StringField({ isArray: false })
  @IsOptional()
  marprt_f_b?: string;
  /**
   * Covered Product margins (Commodity High leverage)
   */
  @StringField({ isArray: false })
  @IsOptional()
  marprt_c_h?: string;
  /**
   * Covered Product margins (Commodity Bracket Order)
   */
  @StringField({ isArray: false })
  @IsOptional()
  marprt_c_b?: string;
  /**
   * Scrip basket margin (Equity Intraday)
   */
  @StringField({ isArray: false })
  @IsOptional()
  scripbskmar_e_i?: string;
  /**
   * Scrip basket margin (Equity Margin)
   */
  @StringField({ isArray: false })
  @IsOptional()
  scripbskmar_e_m?: string;
  /**
   * Scrip basket margin (Equity Cash n Carry)
   */
  @StringField({ isArray: false })
  @IsOptional()
  scripbskmar_e_c?: string;
  /**
   * Additional scrip basket margin (Derivative Intraday)
   */
  @StringField({ isArray: false })
  @IsOptional()
  addscripbskmrg_d_i?: string;
  /**
   * Additional scrip basket margin (Derivative Margin)
   */
  @StringField({ isArray: false })
  @IsOptional()
  addscripbskmrg_d_m?: string;
  /**
   * Additional scrip basket margin (FX Intraday)
   */
  @StringField({ isArray: false })
  @IsOptional()
  addscripbskmrg_f_i?: string;
  /**
   * Additional scrip basket margin (FX Margin)
   */
  @StringField({ isArray: false })
  @IsOptional()
  addscripbskmrg_f_m?: string;
  /**
   * Additional scrip basket margin (Commodity Intraday)
   */
  @StringField({ isArray: false })
  @IsOptional()
  addscripbskmrg_c_i?: string;
  /**
   * Additional scrip basket margin (Commodity Margin)
   */
  @StringField({ isArray: false })
  @IsOptional()
  addscripbskmrg_c_m?: string;
  /**
   * Brokerage (Equity Intraday)
   */
  @StringField({ isArray: false })
  @IsOptional()
  brkage_e_i?: string;
  /**
   * Brokerage (Equity Margin)
   */
  @StringField({ isArray: false })
  @IsOptional()
  brkage_e_m?: string;
  /**
   * Brokerage (Equity CAC)
   */
  @StringField({ isArray: false })
  @IsOptional()
  brkage_e_c?: string;
  /**
   * Brokerage (Equity High Leverage)
   */
  @StringField({ isArray: false })
  @IsOptional()
  brkage_e_h?: string;
  /**
   * Brokerage (Equity Bracket Order)
   */
  @StringField({ isArray: false })
  @IsOptional()
  brkage_e_b?: string;
  /**
   * Brokerage (Derivative Intraday)
   */
  @StringField({ isArray: false })
  @IsOptional()
  brkage_d_i?: string;
  /**
   * Brokerage (Derivative Margin)
   */
  @StringField({ isArray: false })
  @IsOptional()
  brkage_d_m?: string;
  /**
   * Brokerage (Derivative High Leverage)
   */
  @StringField({ isArray: false })
  @IsOptional()
  brkage_d_h?: string;
  /**
   * Brokerage (Derivative Bracket Order)
   */
  @StringField({ isArray: false })
  @IsOptional()
  brkage_d_b?: string;
  /**
   * Brokerage (FX Intraday)
   */
  @StringField({ isArray: false })
  @IsOptional()
  brkage_f_i?: string;
  /**
   * Brokerage (FX Margin)
   */
  @StringField({ isArray: false })
  @IsOptional()
  brkage_f_m?: string;
  /**
   * Brokerage (FX High Leverage)
   */
  @StringField({ isArray: false })
  @IsOptional()
  brkage_f_h?: string;
  /**
   * Brokerage (FX Bracket Order)
   */
  @StringField({ isArray: false })
  @IsOptional()
  brkage_f_b?: string;
  /**
   * Brokerage (Commodity Intraday)
   */
  @StringField({ isArray: false })
  @IsOptional()
  brkage_c_i?: string;
  /**
   * Brokerage (Commodity Margin)
   */
  @StringField({ isArray: false })
  @IsOptional()
  brkage_c_m?: string;
  /**
   * Brokerage (Commodity High Leverage)
   */
  @StringField({ isArray: false })
  @IsOptional()
  brkage_c_h?: string;
  /**
   * Brokerage (Commodity Bracket Order)
   */
  @StringField({ isArray: false })
  @IsOptional()
  brkage_c_b?: string;
  /**
   * Error message if the request failed
   */
  @StringField({ isArray: false })
  @IsOptional()
  emsg?: string;
}
