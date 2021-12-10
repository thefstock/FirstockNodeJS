import { ClassConstructor } from 'class-transformer';
import { filter, firstValueFrom, Observable, Subject } from 'rxjs';
import { Inject, Service } from 'typedi';
import { IMessageEvent, w3cwebsocket } from 'websocket';

import { MessageTopic, ResponseStatus } from '../common';
import { Context, ModelUtils, PlainObject } from '../utils';

import { WS_CONNECTION_RESULT_KEY } from './constants';
import {
  IWebsocketConnectionParams,
  IWebsocketConnectionResult,
  IWebsocketMessage,
} from './interfaces';
import {
  DepthSubscribeModel,
  DepthUnsubscribeModel,
  OrderSubscribeModel,
  OrderUnsubscribeModel,
  TouchlineSubscribeModel,
  TouchlineUnsubscribeModel,
  WebsocketConnectionModel,
} from './models';

export type onOpenHandler = (
  result: IWebsocketConnectionResult
) => void | Promise<void>;
export type onCloseHandler = () => void | Promise<void>;
export type onErrorHandler = (error: Error) => void | Promise<void>;
export type onMessageHandler = (
  message: IWebsocketMessage
) => void | Promise<void>;

/**
 * The websocket client for listening to events on the market.
 * The class exposes methods to subscribe and unsubscribe to different feeds (touchline, depth & order updates).
 * It also exposes corresponding observables (touchline$, depth$ and order$) that emits update from each subscription.
 * @category Clients
 */
@Service()
export class WsClient {
  /**
   * The internal ws client
   */
  private client: w3cwebsocket;
  /**
   * The client context
   */
  @Inject()
  private context: Context;
  /**
   * handlers to run on connection open
   */
  private onOpenHandlers: Array<onOpenHandler>;
  /**
   * handlers to run on connection error
   */
  private onErrorHandlers: Array<onErrorHandler>;
  /**
   * handlers to run when connection is closed
   */
  private onCloseHandlers: Array<onCloseHandler>;
  /**
   * handler to run when a message is received on the attached topic
   */
  private onMessageHandlers: Map<MessageTopic, Array<onMessageHandler>>;
  /* -------------------------------------------------------------------------- */
  /*                                  SUBJECTS                                  */
  /* -------------------------------------------------------------------------- */
  /**
   * The subject that subscribes to all messages
   */
  #messages$: Subject<IWebsocketMessage> = new Subject();
  get messages$() {
    return this.#messages$;
  }
  /**
   * The touchline updates observable
   */
  get touchline$() {
    return this.#messages$.pipe(
      filter((obj) => obj.t === MessageTopic.TOUCHLINE_FEED)
    );
  }
  /**
   * The depth updates subject
   */
  get depth$() {
    return this.#messages$.pipe(
      filter((obj) => obj.t === MessageTopic.DEPTH_FEED)
    );
  }
  /**
   * The order updates subject
   */
  get order$() {
    return this.#messages$.pipe(
      filter((obj) => obj.t === MessageTopic.ORDER_FEED)
    );
  }

  /**
   * Connect to the server
   * @param params The connection parameters
   */
  async connect(
    params: IWebsocketConnectionParams
  ): Promise<IWebsocketConnectionResult> {
    // remove any existing results from context
    this.context.deleteState(WS_CONNECTION_RESULT_KEY);
    // initialize handlers
    this.client.onopen = () => {
      // send the connection request
      const { uid, actid, susertoken = this.context.getToken() } = params;
      const model = ModelUtils.parse(WebsocketConnectionModel, {
        uid,
        actid,
        susertoken,
      });
      this.client.send(ModelUtils.stringify(model));
    };
    this.client.onclose = () => this.runOnCloseHandlers();
    this.client.onerror = (error) => this.runOnErrorHandlers(error);
    this.client.onmessage = (event) => this.runOnMessageHandlers(event);
    // initialize and connect the client
    this.client = new w3cwebsocket(this.context.wsUrl);
    // return the promise
    return firstValueFrom(
      this.#messages$.pipe(
        filter((msg) => msg.t === MessageTopic.CONNECTION_ACK)
      ) as Observable<IWebsocketConnectionResult>
    );
  }
  /**
   * Close the connection
   */
  close() {
    this.client && this.client.close();
  }

  /**
   * Subscribe to touchline feed.
   * Once subscribed, you can access the feeds from `touchline$` observable.
   * @param payload The parameters to subscribe to touchline feed
   */
  async subscribeTouchline(
    payload: PlainObject<TouchlineSubscribeModel>
  ): Promise<IWebsocketMessage> {
    return this.sendRequestWithAck(
      payload,
      MessageTopic.TOUCHLINE_SUB,
      MessageTopic.TOUCHLINE_SUB_ACK,
      TouchlineSubscribeModel
    );
  }
  /**
   * unsubscribe from touchline
   * @param payload The parameters to unsubscribe from touchline
   */
  async unsubscribeTouchline(
    payload: PlainObject<TouchlineUnsubscribeModel>
  ): Promise<IWebsocketMessage> {
    return this.sendRequestWithAck(
      payload,
      MessageTopic.TOUCHLINE_UNSUB,
      MessageTopic.TOUCHLINE_UNSUB_ACK,
      TouchlineUnsubscribeModel
    );
  }

  /**
   * Subscribe to depth feed.
   * Once subscribed, you can access the feeds from `depth$` observable.
   * @param payload The parameters to subscribe to touchline feed
   */
  subscribeDepth(
    payload: PlainObject<DepthSubscribeModel>
  ): Promise<IWebsocketMessage> {
    return this.sendRequestWithAck(
      payload,
      MessageTopic.DEPTH_SUB,
      MessageTopic.DEPTH_SUB_ACK,
      DepthSubscribeModel
    );
  }
  /**
   * unsubscribe from depth
   * @param payload The parameters to unsubscribe from depth
   */
  unsubscribeDepth(
    payload: PlainObject<DepthUnsubscribeModel>
  ): Promise<IWebsocketMessage> {
    return this.sendRequestWithAck(
      payload,
      MessageTopic.DEPTH_UNSUB,
      MessageTopic.DEPTH_UNSUB_ACK,
      DepthUnsubscribeModel
    );
  }

  /**
   * Subscribe to order update feed.
   * Once subscribed, you can access the feeds from `order$` observable.
   * @param payload The parameters to subscribe to order update feed
   */
  subscribeOrder(
    payload: PlainObject<OrderSubscribeModel>
  ): Promise<IWebsocketMessage> {
    return this.sendRequestWithAck(
      payload,
      MessageTopic.ORDER_SUB,
      MessageTopic.ORDER_SUB_ACK,
      OrderSubscribeModel
    );
  }
  /**
   * unsubscribe from order update
   * @param payload The parameters to unsubscribe from order update
   */
  unsubscribeOrder(
    payload: PlainObject<OrderUnsubscribeModel>
  ): Promise<IWebsocketMessage> {
    return this.sendRequestWithAck(
      payload,
      MessageTopic.ORDER_UNSUB,
      MessageTopic.ORDER_UNSUB_ACK,
      OrderUnsubscribeModel
    );
  }

  /* -------------------------------------------------------------------------- */
  /*                               EVENT HANDLERS                               */
  /* -------------------------------------------------------------------------- */
  /**
   * add event handler for open event
   * @param handler The handler function
   */
  addOnOpenHandler(handler: onOpenHandler) {
    this.onOpenHandlers.push(handler);
  }
  /**
   * remove an event handler for open event
   * @param handler The handler function to remove
   */
  removeOnOpenHandler(handler: onOpenHandler) {
    const index = this.onOpenHandlers.findIndex((h) => handler === h);
    index > -1 && this.onOpenHandlers.splice(index, 1);
  }
  /**
   * add event handler for close event
   * @param handler The handler function
   */
  addOnCloseHandler(handler: onCloseHandler) {
    this.onCloseHandlers.push(handler);
  }
  /**
   * remove an event handler for close event
   * @param handler The handler function to remove
   */
  removeOnCloseHandler(handler: onCloseHandler) {
    const index = this.onCloseHandlers.findIndex((h) => handler === h);
    index > -1 && this.onCloseHandlers.splice(index, 1);
  }
  /**
   * add event handler for error event
   * @param handler The handler function
   */
  addOnErrorHandler(handler: onErrorHandler) {
    this.onErrorHandlers.push(handler);
  }
  /**
   * remove an event handler for error event
   * @param handler The handler function to remove
   */
  removeOnErrorHandler(handler: onErrorHandler) {
    const index = this.onErrorHandlers.findIndex((h) => handler === h);
    index > -1 && this.onErrorHandlers.splice(index, 1);
  }
  /**
   * add event handler for message event
   * @param handler The handler function
   */
  addOnMessageHandler(topic: MessageTopic, handler: onMessageHandler) {
    if (this.onMessageHandlers.has(topic)) {
      this.onMessageHandlers.set(topic, []);
    }
    this.onMessageHandlers.get(topic).push(handler);
  }
  /**
   * remove an event handler for message event
   * @param handler The handler function to remove
   */
  removeOnMessageHandler(topic: MessageTopic, handler: onMessageHandler) {
    if (this.onMessageHandlers.has(topic)) {
      const index = this.onMessageHandlers
        .get(topic)
        .findIndex((h) => handler === h);
      index > -1 && this.onMessageHandlers.get(topic).splice(index, 1);
    }
  }

  /* -------------------------------------------------------------------------- */
  /*                               PRIVATE METHODS                              */
  /* -------------------------------------------------------------------------- */
  /**
   * Send a request and wait for ack
   * @param payload The payload for the request
   * @param ackTopic The topic where we receive acknowledgement
   * @param modelClass The model class constructor
   */
  private async sendRequestWithAck<TModel extends IWebsocketMessage>(
    payload: PlainObject<TModel>,
    topic: MessageTopic,
    ackTopic: MessageTopic,
    modelClass: ClassConstructor<TModel>
  ) {
    const model = ModelUtils.parse(modelClass, payload);
    model.t = topic;
    this.client.send(ModelUtils.stringify(model));
    return firstValueFrom(
      this.#messages$.pipe(filter((msg) => msg.t === ackTopic))
    );
  }
  /**
   * method executes all the onOpenHandlers for the client
   */
  private async runOnOpenHandlers(result: IWebsocketConnectionResult) {
    await Promise.all(
      this.onOpenHandlers.map(async (handler) => {
        await handler(result);
      })
    );
  }
  /**
   * method executes all the onCloseHandlers for the client
   */
  private async runOnCloseHandlers() {
    await Promise.all(
      this.onCloseHandlers.map(async (handler) => {
        await handler();
      })
    );
  }
  /**
   * method executes all the onErrorHandlers for the client
   */
  private async runOnErrorHandlers(error: Error) {
    await Promise.all(
      this.onErrorHandlers.map(async (handler) => {
        await handler(error);
      })
    );
  }

  /**
   * Run all onMessageHandlers for the message topic
   * @param event The message event
   */
  private async runOnMessageHandlers(event: IMessageEvent) {
    const obj: IWebsocketMessage = JSON.parse(event.data.toString());
    // send next value as error to messages$ subject if stat is not ok
    if (obj.s === ResponseStatus.NOT_OK) this.messages$.error(obj);
    // send next value to messages$ subject if stat is ok
    else this.messages$.next(obj);
    if (obj.t === MessageTopic.CONNECTION_ACK) {
      this.context.setState(
        WS_CONNECTION_RESULT_KEY,
        obj as IWebsocketConnectionResult
      );
      this.runOnOpenHandlers(obj as IWebsocketConnectionResult);
    }
    if (this.onMessageHandlers.has(obj.t)) {
      const handlers = this.onMessageHandlers.get(obj.t);
      await Promise.all(
        handlers.map(async (handler) => {
          handler(obj);
        })
      );
    }
  }
}
