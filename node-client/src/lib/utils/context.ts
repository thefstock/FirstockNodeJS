import axios, { AxiosInstance } from 'axios';
import { Service } from 'typedi';

/**
 * The context parameters
 */
export interface IContextParams {
  /**
   * The api url
   */
  apiUrl: string;
  /**
   * The web socket url
   */
  wsUrl: string;
}

@Service()
export class Context {
  /**
   * The context state, used to store shared state
   */
  private state: Map<string, any> = new Map();
  /**
   * The rest api agent to use.
   * Uses an axios instance
   */
  #agent: AxiosInstance = axios.create();
  get agent(): AxiosInstance {
    return this.#agent;
  }
  /**
   * The url of the api server.
   */
  #apiUrl: string;
  get apiUrl(): string {
    return this.#apiUrl;
  }
  /**
   * The url of the websocket server.
   */
  #wsUrl: string;
  get wsUrl(): string {
    return this.#wsUrl;
  }
  /**
   * Create a new context
   * @param params The context parameters
   */
  constructor(params: IContextParams) {
    this.#apiUrl = params.apiUrl;
    this.#wsUrl = params.wsUrl;
  }
  /**
   * Set a state variable on the context
   * @param key The key to identify the state variable
   * @param value The value of the state variable
   */
  setState<V = any>(key: string, value: V) {
    this.state.set(key, value);
  }

  /**
   * Get a state variable from the context
   * @param key The key to identify the state variable
   */
  getState<V = any>(key: string): V {
    return this.state.get(key);
  }
  /**
   * Delete a state variable from context
   * @param key The key for the state variable to delete
   */
  deleteState(key: string): void {
    this.state.delete(key);
  }
  /**
   * Check if a state variable is available on the context
   * @param key The key for the state variable
   */
  hasState(key: string): boolean {
    return this.state.has(key);
  }

  /**
   * Get stored token from state. Alias to `context.getState('key')`
   */
  getToken(): string {
    return this.getState('key');
  }
  /**
   * Store the token on state. Alias to `context.setState('key', token)`
   * @param token The token to store
   */
  setToken(token: string) {
    this.setState('key', token);
  }
}