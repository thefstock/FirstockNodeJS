/**
 * @internal
 * The endpoints for orders module
 *  */
const endpoints = {
  PLACE_ORDER: 'PlaceOrder',
  MODIFY_ORDER: 'ModifyOrder',
  CANCEL_ORDER: 'CancelOrder',
  EXIT_SNO_ORDER: 'ExitSNOOrder',
  GET_ORDER_MARGIN: 'GetOrderMargin',
  GET_BASKET_MARGIN: 'GetBasketMargin',
  ORDER_BOOK: 'OrderBook',
  MULTILEG_ORDER_BOOK: 'MultiLegOrderBook',
  SINGLE_ORDER_HISTORY: 'SingleOrdHist',
  TRADE_BOOK: 'TradeBook',
  POSITION_BOOK: 'PositionBook',
  CONVERT_PRODUCT: 'ProductConversion',
};

export default endpoints;
