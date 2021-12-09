/**
 * @module
 * common models used across the project
 *  */

import { IsOptional } from 'class-validator';

import {
  EnumField,
  Joined,
  MessageTopic,
  RequestSourceType,
  StringField,
} from '../../common';

/**
 * The websocket connection model model
 */
export class WebsocketConnectionModel {
  /**
   * The message topic
   */
  @EnumField(MessageTopic)
  t: MessageTopic = MessageTopic.CONNECTION;
  /**
   * User ID
   */
  @StringField({ isArray: false })
  uid: string;
  /**
   * Account id
   */
  @StringField({ isArray: false })
  actid: string;
  /**
   * Source should be same as login request.
   */
  @EnumField(RequestSourceType)
  source: RequestSourceType;
  /**
   * User Session Token
   */
  @StringField({ isArray: false })
  @IsOptional()
  susertoken?: string;
}

/**
 * The depth subscribe model model
 */
export class DepthSubscribeModel {
  /**
   * Always 'd' for depth task
   */
  @EnumField(MessageTopic)
  t: MessageTopic = MessageTopic.DEPTH_SUB;
  /**
   * One or more scriplist for subscription
   */
  @StringField({ isArray: true })
  @Joined()
  k: string[];
}

/**
 * The depth unsubscribe model model
 */
export class DepthUnsubscribeModel {
  /**
   * Always 'ud' for unsubscribe depth task
   */
  @EnumField(MessageTopic)
  t: MessageTopic = MessageTopic.DEPTH_UNSUB;
  /**
   * One or more scriplist for unsubscription
   */
  @StringField({ isArray: true })
  @Joined()
  k: string[];
}

/**
 * The order subscribe model model
 */
export class OrderSubscribeModel {
  /**
   * Always 'o' for order update task
   */
  @EnumField(MessageTopic)
  t: MessageTopic = MessageTopic.ORDER_SUB;
  /**
   * Account id based on which order updated to be sent.
   */
  @StringField({ isArray: false })
  actid: string;
}

/**
 * The order unsubscribe model model
 */
export class OrderUnsubscribeModel {
  /**
   * Always 'uo' for unsubscribe order update task
   */
  @EnumField(MessageTopic)
  t: MessageTopic = MessageTopic.ORDER_UNSUB;
}

/**
 * The touchline subscribe model model
 */
export class TouchlineSubscribeModel {
  /**
   * Always 't' for touchline task
   */
  @EnumField(MessageTopic)
  t: MessageTopic = MessageTopic.TOUCHLINE_SUB;
  /**
   * One or more scriplist for subscription
   */
  @StringField({ isArray: true })
  @Joined()
  k: string[];
}

/**
 * The touchline unsubscribe model model
 */
export class TouchlineUnsubscribeModel {
  /**
   * Always 'u' for unsubscribe touchline task
   */
  @EnumField(MessageTopic)
  t: MessageTopic = MessageTopic.TOUCHLINE_UNSUB;
  /**
   * One or more scriplist for unsubscription
   */
  @StringField({ isArray: true })
  @Joined()
  k: string[];
}
