import { Inject, Service } from 'typedi';

import { Context, DataSource, PlainObject } from '../../utils';

import endpoints from './funds.endpoints';
import { GetContentBasketRequestModel, GetContentBasketResponseModel, GetContentListRequestModel, GetContentListResponseModel, GetMaxPayoutAmountRequestModel, GetMaxPayoutAmountResponseModel } from './models';

/**
 * The data source service for funds module.
*/
@Service()
export class FundsService extends DataSource {
  /**
   * The client context
  */
  @Inject()
  _context: Context;
  get context() { return this._context; }
  /**
   * Get max payout amount
   * @param data The payload for get max payout amount request
  */
  async getMaxPayoutAmount(data: PlainObject<GetMaxPayoutAmountRequestModel>): Promise<GetMaxPayoutAmountResponseModel> {
    const endpoint = endpoints.GET_MAX_PAYOUT_AMOUNT;
    return this.send({
      data,
      endpoint,
      requestClass: GetMaxPayoutAmountRequestModel,
      responseClass: GetMaxPayoutAmountResponseModel
    });
  }
  /**
   * Get content basket
   * @param data The payload for get content basket request
  */
  async getContentBasket(data: PlainObject<GetContentBasketRequestModel>): Promise<GetContentBasketResponseModel> {
    const endpoint = endpoints.GET_CONTENT_BASKET;
    return this.send({
      data,
      endpoint,
      requestClass: GetContentBasketRequestModel,
      responseClass: GetContentBasketResponseModel
    });
  }
  /**
   * Get content list
   * @param data The payload for get content list request
  */
  async getContentList(data: PlainObject<GetContentListRequestModel>): Promise<GetContentListResponseModel> {
    const endpoint = endpoints.GET_CONTENT_LIST;
    return this.send({
      data,
      endpoint,
      requestClass: GetContentListRequestModel,
      responseClass: GetContentListResponseModel
    });
  }
}
