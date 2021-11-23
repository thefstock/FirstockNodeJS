import { ClassConstructor } from 'class-transformer';
import urlJoin from 'url-join';

import { Context } from './context';
import { ModelUtils } from './model-utils';

export interface IDataSourceSendOptions<TRequestModel = any, TResponseModel = any> {
  /**
   * The endpoint to send the request
   */
  endpoint: string;
  /**
   * The model instance for the request
   */
  model: TRequestModel;
  /**
   * Pass authentication key for the request. Optional
   */
  key?: string;
  /**
   * The constructor for the response to parse
   */
  responseClass: ClassConstructor<TResponseModel>
}

/**
 * Options for creating a data source
 */
export interface IDataSourceOptions {
  /**
   * The base url for the data source
   */
  baseUrl: string;
  /**
   * The global headers
   */
  headers?: Record<string, string>;
}

/**
 * The data source handles axios requests
 */
export abstract class DataSource {
  private baseUrl: string;
  private headers: Record<string, string>;

  /**
   * Initialize a data source
   * @param baseUrl The base url for the data source
   * @param headers The global headers to use
   */
  constructor(
    baseUrl: string,
    headers: Record<string, string> = {}
  ) {
    this.baseUrl = baseUrl;
    this.headers = {
      "content-type": "text/plain",
      ...headers
    };
  }

  /**
   * The context of the data source
   */
  abstract get context(): Context;

  /**
   * Send request to the api using model
   * @param option The send options
   */
  async send<T>({ endpoint, model, key, responseClass }: IDataSourceSendOptions<T>) {
    // get key from context if not provided
    key = key ?? this.context.getState('key');
    // convert model to json string
    const payload = ModelUtils.stringify(model);
    // send request
    const data = await this.request(endpoint, payload, key);
    // parse the data
    return ModelUtils.parse(responseClass, data);
  }

  /**
   * Send request to REST API server
   * @param url The relative url to send the request
   * @param payload The payload for the request
   * @param [key] Used for authentication. Optional
   */
  async request(url: string, payload: string, key?: string): Promise<Record<string, any>> {
    // generate url
    const params: string[] = [`jData=${payload}`];
    if (key) params.push(`jKey=${key}`);
    // get data
    const fullUrl = this.expandUrl(url);
    // send request
    const { data } = await this.context.agent.post(fullUrl, params.join('&'), {
      headers: this.headers
    });
    return data;
  }

  /* -------------------------------------------------------------------------- */
  /*                               PRIVATE METHODS                              */
  /* -------------------------------------------------------------------------- */
  /**
   * Expand relative url using the `baseUrl` property
   * @param url The relative url
   */
  private expandUrl(url: string): string {
    return urlJoin(this.baseUrl, url);
  }
}