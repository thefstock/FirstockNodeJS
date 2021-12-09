/**
 * The source of the request, mobile or web or api
 */
export enum RequestSourceType {
  MOB = 'MOB',
  WEB = 'WEB',
  API = 'API',
}

/**
 * The response success or failure status
 */
export enum ResponseStatus {
  OK = 'Ok',
  NOT_OK = 'Not_Ok',
}

/**
 * The price type for orders & trades
 */
export enum PriceType {
  LIMIT = 'LMT',
  MARKET = 'MKT',
  STOP_LOSS_LIMIT = 'SL-LMT',
  STOP_LOSS_MARKET = 'SL-MKT',
  DS = 'DS',
  SECOND_LEG = '2L',
  THIRD_LEG = '3L',
}

/**
 * The transaction type for orders & trades
 */
export enum TransactionType {
  BUY = 'B',
  SELL = 'S',
}

/**
 * The retention type for orders
 */
export enum RetentionType {
  DAY = 'DAY',
  IOC = 'IOC',
  EOS = 'EOS',
}

/**
 * The alert validity
 */
export enum AlertValidity {
  DAY = 'DAY',
  GTT = 'GTT',
}

/**
 * The available alert types
 */
export enum AlertType {
  LTP_A = 'LTP_A',
  LTP_B = 'LTP_B',
  CH_PER_A = 'CH_PER_A',
  CH_PER_B = 'CH_PER_B',
  ATP_A = 'ATP_A',
  ATP_B = 'ATP_B',
  LTP_A_52HIGH = 'LTP_A_52HIGH',
  LTP_B_52LOW = 'LTP_B_52LOW',
  VOLUME_A = 'VOLUME_A',
  OI_A = 'OI_A',
  OI_B = 'OI_B',
  TOI_A = 'TOI_A',
  TOI_B = 'TOI_B',
  LMT_BOS_O = 'LMT_BOS_O',
}

/**
 * Different message topics used for websocket communication
 */
export enum MessageTopic {
  CONNECTION = 'c',
  CONNECTION_ACK = 'ck',
  // Touchline
  TOUCHLINE_SUB = 't',
  TOUCHLINE_SUB_ACK = 'tk',
  TOUCHLINE_FEED = 'tf',
  TOUCHLINE_UNSUB = 'u',
  TOUCHLINE_UNSUB_ACK = 'uk',
  // depth
  DEPTH_SUB = 'd',
  DEPTH_SUB_ACK = 'dk',
  DEPTH_FEED = 'df',
  DEPTH_UNSUB = 'ud',
  DEPTH_UNSUB_ACK = 'udk',
  // order
  ORDER_SUB = 'o',
  ORDER_SUB_ACK = 'ok',
  ORDER_FEED = 'om',
  ORDER_UNSUB = 'uo',
  ORDER_UNSUB_ACK = 'uok',
}
