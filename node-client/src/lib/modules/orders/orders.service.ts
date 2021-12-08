import { Inject, Service } from 'typedi';

import { Context, DataSource, PlainObject } from '../../utils';

import {
  CancelOrderRequestModel,
  CancelOrderResponseModel,
  ConvertProductRequestModel,
  ConvertProductResponseModel,
  ExitSnoOrderRequestModel,
  ExitSnoOrderResponseModel,
  GetBasketMarginRequestModel,
  GetBasketMarginResponseModel,
  GetOrderMarginRequestModel,
  GetOrderMarginResponseModel,
  ModifyOrderRequestModel,
  ModifyOrderResponseModel,
  MultilegOrderBookRequestModel,
  MultilegOrderBookResponseModel,
  OrderBookRequestModel,
  OrderBookResponseModel,
  PlaceOrderRequestModel,
  PlaceOrderResponseModel,
  PositionBookRequestModel,
  PositionBookResponseModel,
  SingleOrderHistoryRequestModel,
  SingleOrderHistoryResponseModel,
  TradeBookRequestModel,
  TradeBookResponseModel,
} from './models';
import endpoints from './orders.endpoints';

/**
 * The data source service for orders module.
 */
@Service()
export class OrdersService extends DataSource {
  /**
   * The client context
   */
  @Inject()
  _context: Context;
  get context() {
    return this._context;
  }
  /**
   * Place a new order
   * @param data The payload for place order request
   */
  async placeOrder(
    data: PlainObject<PlaceOrderRequestModel>
  ): Promise<PlaceOrderResponseModel> {
    const endpoint = endpoints.PLACE_ORDER;
    return this.send({
      data,
      endpoint,
      requestClass: PlaceOrderRequestModel,
      responseClass: PlaceOrderResponseModel,
    });
  }
  /**
   * Modify an order
   * @param data The payload for modify order request
   */
  async modifyOrder(
    data: PlainObject<ModifyOrderRequestModel>
  ): Promise<ModifyOrderResponseModel> {
    const endpoint = endpoints.MODIFY_ORDER;
    return this.send({
      data,
      endpoint,
      requestClass: ModifyOrderRequestModel,
      responseClass: ModifyOrderResponseModel,
    });
  }
  /**
   * Cancel order
   * @param data The payload for cancel order request
   */
  async cancelOrder(
    data: PlainObject<CancelOrderRequestModel>
  ): Promise<CancelOrderResponseModel> {
    const endpoint = endpoints.CANCEL_ORDER;
    return this.send({
      data,
      endpoint,
      requestClass: CancelOrderRequestModel,
      responseClass: CancelOrderResponseModel,
    });
  }
  /**
   * Exit sno order
   * @param data The payload for exit sno order request
   */
  async exitSnoOrder(
    data: PlainObject<ExitSnoOrderRequestModel>
  ): Promise<ExitSnoOrderResponseModel> {
    const endpoint = endpoints.EXIT_SNO_ORDER;
    return this.send({
      data,
      endpoint,
      requestClass: ExitSnoOrderRequestModel,
      responseClass: ExitSnoOrderResponseModel,
    });
  }
  /**
   * Get order margin
   * @param data The payload for get order margin request
   */
  async getOrderMargin(
    data: PlainObject<GetOrderMarginRequestModel>
  ): Promise<GetOrderMarginResponseModel> {
    const endpoint = endpoints.GET_ORDER_MARGIN;
    return this.send({
      data,
      endpoint,
      requestClass: GetOrderMarginRequestModel,
      responseClass: GetOrderMarginResponseModel,
    });
  }
  /**
   * Get basket margin
   * @param data The payload for get basket margin request
   */
  async getBasketMargin(
    data: PlainObject<GetBasketMarginRequestModel>
  ): Promise<GetBasketMarginResponseModel> {
    const endpoint = endpoints.GET_BASKET_MARGIN;
    return this.send({
      data,
      endpoint,
      requestClass: GetBasketMarginRequestModel,
      responseClass: GetBasketMarginResponseModel,
    });
  }
  /**
   * Order book
   * @param data The payload for order book request
   */
  async orderBook(
    data: PlainObject<OrderBookRequestModel>
  ): Promise<OrderBookResponseModel> {
    const endpoint = endpoints.ORDER_BOOK;
    return this.send({
      data,
      endpoint,
      requestClass: OrderBookRequestModel,
      responseClass: OrderBookResponseModel,
    });
  }
  /**
   * Multi Leg Order book
   * @param data The payload for multileg order book request
   */
  async multilegOrderBook(
    data: PlainObject<MultilegOrderBookRequestModel>
  ): Promise<MultilegOrderBookResponseModel> {
    const endpoint = endpoints.MULTILEG_ORDER_BOOK;
    return this.send({
      data,
      endpoint,
      requestClass: MultilegOrderBookRequestModel,
      responseClass: MultilegOrderBookResponseModel,
    });
  }
  /**
   * Single Order History
   * @param data The payload for single order history request
   */
  async singleOrderHistory(
    data: PlainObject<SingleOrderHistoryRequestModel>
  ): Promise<SingleOrderHistoryResponseModel> {
    const endpoint = endpoints.SINGLE_ORDER_HISTORY;
    return this.send({
      data,
      endpoint,
      requestClass: SingleOrderHistoryRequestModel,
      responseClass: SingleOrderHistoryResponseModel,
    });
  }
  /**
   * Trade Book
   * @param data The payload for trade book request
   */
  async tradeBook(
    data: PlainObject<TradeBookRequestModel>
  ): Promise<TradeBookResponseModel> {
    const endpoint = endpoints.TRADE_BOOK;
    return this.send({
      data,
      endpoint,
      requestClass: TradeBookRequestModel,
      responseClass: TradeBookResponseModel,
    });
  }
  /**
   * Position Book
   * @param data The payload for position book request
   */
  async positionBook(
    data: PlainObject<PositionBookRequestModel>
  ): Promise<PositionBookResponseModel> {
    const endpoint = endpoints.POSITION_BOOK;
    return this.send({
      data,
      endpoint,
      requestClass: PositionBookRequestModel,
      responseClass: PositionBookResponseModel,
    });
  }
  /**
   * Convert Product
   * @param data The payload for convert product request
   */
  async convertProduct(
    data: PlainObject<ConvertProductRequestModel>
  ): Promise<ConvertProductResponseModel> {
    const endpoint = endpoints.CONVERT_PRODUCT;
    return this.send({
      data,
      endpoint,
      requestClass: ConvertProductRequestModel,
      responseClass: ConvertProductResponseModel,
    });
  }
}
