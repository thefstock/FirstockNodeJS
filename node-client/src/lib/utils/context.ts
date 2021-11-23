import axios, { AxiosInstance } from 'axios';
import { Service } from 'typedi';


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
  get agent(): AxiosInstance { return this.#agent }
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
}