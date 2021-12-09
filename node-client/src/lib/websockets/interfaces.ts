/**
 * @module
 * The interfaces used for the websocket communication
 */

import { ResponseStatus } from '../common';

import { MessageTopic } from './topics';

/**
 * Base interface for all the message interfaces
 */
export interface IWebsocketMessage extends Record<string, any> {
  /**
   * The message topic
   */
  t: MessageTopic;
}

/**
 * The parameters needed for websocket connection
 */
export interface IWebsocketConnectionParams {
  /**
   * The user id
   */
  uid: string;
  /**
   * The account id
   */
  actid: string;
  /**
   * The token recieved on login
   */
  susertoken?: string;
}

/**
 * The parameters needed for websocket connection
 */
export interface IWebsocketConnectionResult extends IWebsocketMessage {
  /**
   * The user id
   */
  uid: string;
  /**
   * The account id
   */
  s: ResponseStatus;
}
