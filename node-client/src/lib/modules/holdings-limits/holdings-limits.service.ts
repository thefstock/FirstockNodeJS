import { Inject, Service } from 'typedi';

import { Context, DataSource, PlainObject } from '../../utils';

import endpoints from './holdings-limits.endpoints';
import {
  HoldingsRequestModel,
  HoldingsResponseModel,
  LimitsRequestModel,
  LimitsResponseModel,
} from './models';

/**
 * The data source service for holdings limits module.
 */
@Service()
export class HoldingsLimitsService extends DataSource {
  /**
   * The client context
   */
  @Inject()
  _context: Context;
  get context() {
    return this._context;
  }
  /**
   * Holdings
   * @param data The payload for holdings request
   */
  async holdings(
    data: PlainObject<HoldingsRequestModel>
  ): Promise<HoldingsResponseModel> {
    const endpoint = endpoints.HOLDINGS;
    return this.send({
      data,
      endpoint,
      requestClass: HoldingsRequestModel,
      responseClass: HoldingsResponseModel,
    });
  }
  /**
   * Limits
   * @param data The payload for limits request
   */
  async limits(
    data: PlainObject<LimitsRequestModel>
  ): Promise<LimitsResponseModel> {
    const endpoint = endpoints.LIMITS;
    return this.send({
      data,
      endpoint,
      requestClass: LimitsRequestModel,
      responseClass: LimitsResponseModel,
    });
  }
}
