/**
 * The node client library.
 * 
 * **Usage**
 * 
 * ```ts
 * // typescript
 * import { Client, createClient } from '@f-py/node-client';
 *
 * const client: Client = createClient({ apiUrl: API_URL, wsUrl: WS_URL });
 *
 * (async () => {
 *    const result = await client.login({ ... })
 * })()
 * ```
 * @packageDocumentation Node Client
 */

import 'reflect-metadata';
import 'es6-shim';

export { createClient, Client } from './lib/client';
export { IContextParams, Context, PlainObject } from './lib/utils';
export * as models from './lib/models';
export * as ws from './lib/websockets';
export * from './lib/modules';
export * as enums from './lib/common/enums';
export * as exceptions from './lib/common/exceptions';