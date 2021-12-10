import { Inject, Service } from 'typedi';

import { Context, DataSource, PlainObject } from '../../utils';

import {
  AddScripsRequestModel,
  AddScripsResponseModel,
  DeleteScripsRequestModel,
  DeleteScripsResponseModel,
  GetPredefinedScripsRequestModel,
  GetPredefinedScripsResponseModel,
  GetPredefinedWatchlistsRequestModel,
  GetPredefinedWatchlistsResponseModel,
  GetQuotesRequestModel,
  GetQuotesResponseModel,
  GetSecurityInfoRequestModel,
  GetSecurityInfoResponseModel,
  GetWatchlistNamesRequestModel,
  GetWatchlistNamesResponseModel,
  GetWatchlistRequestModel,
  GetWatchlistResponseModel,
  SearchScripsRequestModel,
  SearchScripsResponseModel,
} from './models';
import endpoints from './watchlists.endpoints';

/**
 * The data source service for watchlists module.
 * @category Data Sources
 */
@Service()
export class WatchlistsService extends DataSource {
  /**
   * The client context
   */
  @Inject()
  _context: Context;
  get context() {
    return this._context;
  }
  /**
   * Fetch watchlist names
   * @param data The payload for get names request
   */
  async getNames(
    data: PlainObject<GetWatchlistNamesRequestModel>
  ): Promise<GetWatchlistNamesResponseModel> {
    const endpoint = endpoints.GET_NAMES;
    return this.send({
      data,
      endpoint,
      requestClass: GetWatchlistNamesRequestModel,
      responseClass: GetWatchlistNamesResponseModel,
    });
  }
  /**
   * Get scrip list for a given watchlist name
   * @param data The payload for get watchlist request
   */
  async getWatchlist(
    data: PlainObject<GetWatchlistRequestModel>
  ): Promise<GetWatchlistResponseModel> {
    const endpoint = endpoints.GET_WATCHLIST;
    return this.send({
      data,
      endpoint,
      requestClass: GetWatchlistRequestModel,
      responseClass: GetWatchlistResponseModel,
    });
  }
  /**
   * Search for scrips
   * @param data The payload for search scrips request
   */
  async searchScrips(
    data: PlainObject<SearchScripsRequestModel>
  ): Promise<SearchScripsResponseModel> {
    const endpoint = endpoints.SEARCH_SCRIPS;
    return this.send({
      data,
      endpoint,
      requestClass: SearchScripsRequestModel,
      responseClass: SearchScripsResponseModel,
    });
  }
  /**
   * Add multiple scrips to a watchlist
   * @param data The payload for add scrips request
   */
  async addScrips(
    data: PlainObject<AddScripsRequestModel>
  ): Promise<AddScripsResponseModel> {
    const endpoint = endpoints.ADD_SCRIPS;
    return this.send({
      data,
      endpoint,
      requestClass: AddScripsRequestModel,
      responseClass: AddScripsResponseModel,
    });
  }
  /**
   * Delete scrips from a watchlist
   * @param data The payload for delete scrips request
   */
  async deleteScrips(
    data: PlainObject<DeleteScripsRequestModel>
  ): Promise<DeleteScripsResponseModel> {
    const endpoint = endpoints.DELETE_SCRIPS;
    return this.send({
      data,
      endpoint,
      requestClass: DeleteScripsRequestModel,
      responseClass: DeleteScripsResponseModel,
    });
  }
  /**
   * Get security info
   * @param data The payload for get security info request
   */
  async getSecurityInfo(
    data: PlainObject<GetSecurityInfoRequestModel>
  ): Promise<GetSecurityInfoResponseModel> {
    const endpoint = endpoints.GET_SECURITY_INFO;
    return this.send({
      data,
      endpoint,
      requestClass: GetSecurityInfoRequestModel,
      responseClass: GetSecurityInfoResponseModel,
    });
  }
  /**
   * Get quotes
   * @param data The payload for get quotes request
   */
  async getQuotes(
    data: PlainObject<GetQuotesRequestModel>
  ): Promise<GetQuotesResponseModel> {
    const endpoint = endpoints.GET_QUOTES;
    return this.send({
      data,
      endpoint,
      requestClass: GetQuotesRequestModel,
      responseClass: GetQuotesResponseModel,
    });
  }
  /**
   * Get list of predefined MWs
   * @param data The payload for get predefined watchlists request
   */
  async getPredefinedWatchlists(
    data: PlainObject<GetPredefinedWatchlistsRequestModel>
  ): Promise<GetPredefinedWatchlistsResponseModel> {
    const endpoint = endpoints.GET_PREDEFINED_WATCHLISTS;
    return this.send({
      data,
      endpoint,
      requestClass: GetPredefinedWatchlistsRequestModel,
      responseClass: GetPredefinedWatchlistsResponseModel,
    });
  }
  /**
   * Get list of predefined MW scrips
   * @param data The payload for get predefined scrips request
   */
  async getPredefinedScrips(
    data: PlainObject<GetPredefinedScripsRequestModel>
  ): Promise<GetPredefinedScripsResponseModel> {
    const endpoint = endpoints.GET_PREDEFINED_SCRIPS;
    return this.send({
      data,
      endpoint,
      requestClass: GetPredefinedScripsRequestModel,
      responseClass: GetPredefinedScripsResponseModel,
    });
  }
}
