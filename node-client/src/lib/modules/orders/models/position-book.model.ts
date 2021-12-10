import { IsOptional } from 'class-validator';

import {
  EnumField,
  ResponseStatus,
  StringField,
  TimestampField,
} from '../../../common';

/**
 * The request model for position book
 * @category Models
 */
export class PositionBookRequestModel {
  /**
   * Logged in User Id
   */
  @StringField({ isArray: false })
  uid: string;
  /**
   * Account Id of logged in user
   */
  @StringField({ isArray: false })
  actid: string;
}

/**
 * The response model for position book
 * @category Models
 */
export class PositionBookResponseModel {
  /**
   * The position book success or failure status
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
   * Exchange Segment
   */
  @StringField({ isArray: false })
  @IsOptional()
  exch?: string;
  /**
   * Trading symbol / contract on which order is placed.
   */
  @StringField({ isArray: false })
  @IsOptional()
  tsym?: string;
  /**
   * Token
   */
  @StringField({ isArray: false })
  @IsOptional()
  token?: string;
  /**
   * User Id
   */
  @StringField({ isArray: false })
  @IsOptional()
  uid?: string;
  /**
   * Account Id
   */
  @StringField({ isArray: false })
  @IsOptional()
  actid?: string;
  /**
   * Display product alias name, using prarr returned in user details.
   */
  @StringField({ isArray: false })
  @IsOptional()
  prd?: string;
  /**
   * Net Position quantity
   */
  @StringField({ isArray: false })
  @IsOptional()
  netqty?: string;
  /**
   * Net position average price
   */
  @StringField({ isArray: false })
  @IsOptional()
  netavgprc?: string;
  /**
   * Day Buy Quantity
   */
  @StringField({ isArray: false })
  @IsOptional()
  daybuyqty?: string;
  /**
   * Day Sell Quantity
   */
  @StringField({ isArray: false })
  @IsOptional()
  daysellqty?: string;
  /**
   * Day Buy average price
   */
  @StringField({ isArray: false })
  @IsOptional()
  daybuyavgprc?: string;
  /**
   * Day buy average price
   */
  @StringField({ isArray: false })
  @IsOptional()
  daysellavgprc?: string;
  /**
   * Day Buy Amount
   */
  @StringField({ isArray: false })
  @IsOptional()
  daybuyamt?: string;
  /**
   * Day Sell Amount
   */
  @StringField({ isArray: false })
  @IsOptional()
  daysellamt?: string;
  /**
   * Carry Forward Buy Quantity
   */
  @StringField({ isArray: false })
  @IsOptional()
  cfbuyqty?: string;
  /**
   * Original Avg Price
   */
  @StringField({ isArray: false })
  @IsOptional()
  cforgavgprc?: string;
  /**
   * Carry Forward Sell Quantity
   */
  @StringField({ isArray: false })
  @IsOptional()
  cfsellqty?: string;
  /**
   * Carry Forward Buy average price
   */
  @StringField({ isArray: false })
  @IsOptional()
  cfbuyavgprc?: string;
  /**
   * Carry Forward Buy average price
   */
  @StringField({ isArray: false })
  @IsOptional()
  cfsellavgprc?: string;
  /**
   * Carry Forward Buy Amount
   */
  @StringField({ isArray: false })
  @IsOptional()
  cfbuyamt?: string;
  /**
   * Carry Forward Sell Amount
   */
  @StringField({ isArray: false })
  @IsOptional()
  cfsellamt?: string;
  /**
   * LTP
   */
  @StringField({ isArray: false })
  @IsOptional()
  lp?: string;
  /**
   * RealizedPNL
   */
  @StringField({ isArray: false })
  @IsOptional()
  rpnl?: string;
  /**
     *
      UnrealizedMTOM.
      (Can be recalculated in LTP update := netqty * (lp from web socket - netavgprc) * prcftr bep Break even price
      
    */
  @StringField({ isArray: false })
  @IsOptional()
  urmtom?: string;
  /**
   * The openbuyqty property
   */
  @StringField({ isArray: false })
  @IsOptional()
  openbuyqty?: string;
  /**
   * The opensellqty property
   */
  @StringField({ isArray: false })
  @IsOptional()
  opensellqty?: string;
  /**
   * The openbuyamt property
   */
  @StringField({ isArray: false })
  @IsOptional()
  openbuyamt?: string;
  /**
   * The opensellamt property
   */
  @StringField({ isArray: false })
  @IsOptional()
  opensellamt?: string;
  /**
   * The openbuyavgprc property
   */
  @StringField({ isArray: false })
  @IsOptional()
  openbuyavgprc?: string;
  /**
   * The opensellavgprc property
   */
  @StringField({ isArray: false })
  @IsOptional()
  opensellavgprc?: string;
  /**
   * The mult property
   */
  @StringField({ isArray: false })
  @IsOptional()
  mult?: string;
  /**
   * Price precision
   */
  @StringField({ isArray: false })
  @IsOptional()
  pp?: string;
  /**
   * Tick size
   */
  @StringField({ isArray: false })
  @IsOptional()
  ti?: string;
  /**
   * Lot size
   */
  @StringField({ isArray: false })
  @IsOptional()
  ls?: string;
  /**
   * gn*pn/(gd*pd)
   */
  @StringField({ isArray: false })
  @IsOptional()
  prcftr?: string;
  /**
   * Error message if the request failed
   */
  @StringField({ isArray: false })
  @IsOptional()
  emsg?: string;
}
