import { ClassConstructor } from 'class-transformer';
import urlJoin from 'url-join';

import { Context } from './context';
import { ModelUtils, PlainObject } from './model-utils';

export interface IDataSourceSendOptions<TRequestModel = any, TResponseModel = any> {
  /**
   * The endpoint to send the request
   */
  endpoint: string;
  /**
   * The payload for the request
   */
  data: PlainObject<TRequestModel>;
  /**
   * Pass authentication key for the request. Optional
   */
  key?: string;
  /**
   * The constructor for the request class
   */
  requestClass: ClassConstructor<TRequestModel>
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
  private headers: Record<string, string>;

  /**
   * Initialize a data source
   * @param baseUrl The base url for the data source
   * @param headers The global headers to use
   */
  constructor(
    headers: Record<string, string> = {}
  ) {
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
  async send<T>({ endpoint, data, key, responseClass, requestClass }: IDataSourceSendOptions<T>) {
    // get key from context if not provided
    key = key ?? this.context.getToken();
    // convert data to model instance
    const model = ModelUtils.parse(requestClass, data);
    // convert model to json string
    const payload = ModelUtils.stringify(model);
    // send request
    const params: string[] = this.buildParams(payload, key);
    const response = await this.request(endpoint, params);
    // parse the response
    return ModelUtils.parse(responseClass, response);
  }

/* -------------------------------------------------------------------------- */
/*                              PROTECTED METHODS                             */
/* -------------------------------------------------------------------------- */

  /**
   * Send request to REST API server
   * @param url The relative url to send the request
   * @param params The payload for the request
   */
  protected async request(url: string, params: string[]): Promise<any> {
    // generate url
    const fullUrl = this.expandUrl(url);
    // send request
    const { data } = await this.context.agent.post(fullUrl, params.join('&'), {
      headers: this.headers
    });
    return data;
  }

  /**
   * Build the params list from payload
   * @param payload The payload json
   * @param key The key supplied if any
   */
  protected buildParams(payload: string, key?: string): string[] {
    const params: string[] = [`jData=${payload}`];
    if (key) params.push(`jKey=${key}`);
    return params;
  }

  /* -------------------------------------------------------------------------- */
  /*                               PRIVATE METHODS                              */
  /* -------------------------------------------------------------------------- */
  /**
   * Expand relative url using the `baseUrl` property
   * @param url The relative url
   */
  private expandUrl(url: string): string {
    return urlJoin(this.context.apiUrl, url);
  }
}