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
