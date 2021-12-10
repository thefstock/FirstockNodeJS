import { Inject, Service } from 'typedi';

import { Context, DataSource, PlainObject } from '../../utils';

import endpoints from './markets.endpoints';
import {
  ExchMsgRequestModel,
  ExchMsgResponseModel,
  GetBrokerMsgRequestModel,
  GetBrokerMsgResponseModel,
  GetIndexListRequestModel,
  GetIndexListResponseModel,
  GetOptionChainRequestModel,
  GetOptionChainResponseModel,
  SpanCalcRequestModel,
  SpanCalcResponseModel,
  TopListNamesRequestModel,
  TopListNamesResponseModel,
  TopListRequestModel,
  TopListResponseModel,
  TpSeriesRequestModel,
  TpSeriesResponseModel,
} from './models';

/**
 * The data source service for markets module.
 * @category Data Sources
 */
@Service()
export class MarketsService extends DataSource {
  /**
   * The client context
   */
  @Inject()
  _context: Context;
  get context() {
    return this._context;
  }
  /**
   * Get index list
   * @param data The payload for get index list request
   */
  async getIndexList(
    data: PlainObject<GetIndexListRequestModel>
  ): Promise<GetIndexListResponseModel> {
    const endpoint = endpoints.GET_INDEX_LIST;
    return this.send({
      data,
      endpoint,
      requestClass: GetIndexListRequestModel,
      responseClass: GetIndexListResponseModel,
    });
  }
  /**
   * Get top list names
   * @param data The payload for top list names request
   */
  async topListNames(
    data: PlainObject<TopListNamesRequestModel>
  ): Promise<TopListNamesResponseModel> {
    const endpoint = endpoints.TOP_LIST_NAMES;
    return this.send({
      data,
      endpoint,
      requestClass: TopListNamesRequestModel,
      responseClass: TopListNamesResponseModel,
    });
  }
  /**
   * Get top list
   * @param data The payload for top list request
   */
  async topList(
    data: PlainObject<TopListRequestModel>
  ): Promise<TopListResponseModel> {
    const endpoint = endpoints.TOP_LIST;
    return this.send({
      data,
      endpoint,
      requestClass: TopListRequestModel,
      responseClass: TopListResponseModel,
    });
  }
  /**
   * Get time price data (Chart data)
   * @param data The payload for tp series request
   */
  async tpSeries(
    data: PlainObject<TpSeriesRequestModel>
  ): Promise<TpSeriesResponseModel> {
    const endpoint = endpoints.TP_SERIES;
    return this.send({
      data,
      endpoint,
      requestClass: TpSeriesRequestModel,
      responseClass: TpSeriesResponseModel,
    });
  }
  /**
   * Get option chain
   * @param data The payload for get option chain request
   */
  async getOptionChain(
    data: PlainObject<GetOptionChainRequestModel>
  ): Promise<GetOptionChainResponseModel> {
    const endpoint = endpoints.GET_OPTION_CHAIN;
    return this.send({
      data,
      endpoint,
      requestClass: GetOptionChainRequestModel,
      responseClass: GetOptionChainResponseModel,
    });
  }
  /**
   * Exch message
   * @param data The payload for exch msg request
   */
  async exchMsg(
    data: PlainObject<ExchMsgRequestModel>
  ): Promise<ExchMsgResponseModel> {
    const endpoint = endpoints.EXCH_MSG;
    return this.send({
      data,
      endpoint,
      requestClass: ExchMsgRequestModel,
      responseClass: ExchMsgResponseModel,
    });
  }
  /**
   * Get broker message
   * @param data The payload for get broker msg request
   */
  async getBrokerMsg(
    data: PlainObject<GetBrokerMsgRequestModel>
  ): Promise<GetBrokerMsgResponseModel> {
    const endpoint = endpoints.GET_BROKER_MSG;
    return this.send({
      data,
      endpoint,
      requestClass: GetBrokerMsgRequestModel,
      responseClass: GetBrokerMsgResponseModel,
    });
  }
  /**
   * Get broker message
   * @param data The payload for span calc request
   */
  async spanCalc(
    data: PlainObject<SpanCalcRequestModel>
  ): Promise<SpanCalcResponseModel> {
    const endpoint = endpoints.SPAN_CALC;
    return this.send({
      data,
      endpoint,
      requestClass: SpanCalcRequestModel,
      responseClass: SpanCalcResponseModel,
    });
  }
}
