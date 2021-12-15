# @f-py/node-client

The `node-client` library abstracts away the REST communication logic by exposing a set of classes and
methods to effectively execute the tasks.

Library exposes a [[`createClient`]] factory function to generate a [[`Client`]] instance inside a context.
The [[`Client`]] instance abstracts the underlying logic by providing methods and submodules to communicate with the server.

#### Usage with typescript
```ts
// typescript
import { Client, createClient, models, enums } from '@f-py/node-client';

const { LoginResponseModel } = models;
const { ResponseStatus } = enums;

const client: Client = createClient({ apiUrl: API_URL, wsUrl: WS_URL });

async function main() {
  try {
    const response: LoginResponseModel = await client.login({ ... });
    if (response.stat === ResponseStatus.OK) {
      console.log('Successful');
      console.log(`token: ${response.susertoken}`)
    } else {
      throw new Error(response.emsg ?? 'Login Failed');
    }
  }
  catch (error) {
    console.error(error);
  }
}

main();
```

> **Note**
> Just remove the type references when using with ES6.
## Getting Started

### Client

The client is the main access point for all operations in every module.
The client syncs the state between all the modules to use a shared application state.

#### Initialize the Client.

Create a client instance using the [[`createClient`]] factory function.

```ts
import { Client, createClient } from '@f-py/node-client';

// We assume that the api url and web socket url comes from env.
const apiUrl = process.env.API_URL;
const wsUrl = process.env.WS_URL;

const client = createClient({ apiUrl, wsUrl });

// OR you can create multiple clients for different contexts
const client1 = createClient({ apiUrl, wsUrl }, "context 1");
const client2 = createClient({ apiUrl, wsUrl }, "context 2");
```
> **Note**
> * If you give duplicate names for the `context` parameter, it will affect both clients.
> * Clients in the same context share service instances and state.
> * Whenever a new client is created for the same context, it will reset the state of the context.
> * If no context is provided, it uses the `"default"` context.

> The `wsUrl` is used to make websocket connections to the server.

#### Login user

Since most of the methods requires the user to login. First you should login user with the {@linkcode Client.login | login} method of client.

```ts
import { Client, createClient, enums, models } from '@f-py/node-client';
// ... any other imports
const { LoginResponseModel } = models;
const { RequestSourceType, ResponseStatus } = enums;

// ... steps to create the client instance

async function login() {
  const response: LoginResponseModel = await client.login({
    apkversion: process.env.APK_VERSION,
    appkey: process.env.APP_KEY,
    vc: process.env.VC,
    uid: process.env.UID,
    pwd: process.env.PASSWORD,
    factor2: process.env.FACTOR2,
    imei: process.env.IMEI,
    source: RequestSourceType.API
  });

  if (response.stat == ResponseStatus.OK) {
    return response;
  }
  else {
    throw new Error(response.emsg ?? 'Login Failed');
  }
}

async function main() {
  try {
    const response: LoginResponseModel = await login();
    console.log('Login Successful')
  }
  catch (error) {
    console.error(error);
  }
}

main();
```

> * The client's internal data-source services does a minimum level of validation and transformation to send proper data in proper format required by the server.

#### Sending Request for protected content

After logging in, now we are able to request contents that requires authentication.
These APIs requires to provide the `susertoken` received from successful login.

The client internally stores this token to the current context state and reuse it to send requests to protected content.

Request for user details after client login:

```ts
// ... imports

const { LoginResponseModel, UserDetailsResponseModel } = models;
// ... other variable assignments

// ... creating client instance

async login() {
  // ... login method
}

async getUserDetails() {
  const response: UserDetailsResponseModel = await client.users.userDetails({
    uid: process.env.UID
  });
  if (response.stat === ResponseStatus.OK) {
    return response;
  }
  else {
    throw new Error(response.emsg ?? 'Could not fetch details');
  }
}

async function main() {
  try {
    await login();
    // send request for user details
    const details: UserDetailsResponseModel = await getUserDetails();
    console.log('User Details:');
    console.log(details);
  }
  catch(error) {
    console.error(error);
  }
}

main();
```

#### Logout

To log a user out, use the {@linkcode Client.logout | logout} method of client.
This sends a logout request to the server and also clears the session token from context state.

```ts
// ...
const { ..., LogoutResponseModel } = models;
// ...
async function logout() {
  const response: LogoutResponseModel = await client.logout(process.env.UID);
  // OR
  const response: LogoutResponseModel = await client.logout({
    uid: process.env.UID
  });
  if (response.stat === ResponseStatus.OK) {
    return response;
  }
  else {
    throw new Error(response.emsg ?? 'Failed to logout user');
  }
}
// ...
function main() {
  try {
    // ... login user
    // ...
    await logout();
    console.log('Successfully logged out');
  }
  catch (error) {
    console.error(error);
  }
}
```

#### Modules / Data Sources / Services

The client comprises of data-sources/modules/services to group the available methods.
All the available services can be accessed from client by the corresponding property:

| Property   | Service                          |
| ---------- | -------------------------------- |
| alerts     | [[alerts.AlertsService]]         |
| funds      | [[funds.FundsService]]           |
| markets    | [[markets.MarketsService]]       |
| orders     | [[orders.OrdersService]]         |
| users      | [[users.UsersService]]           |
| watchlists | [[watchlists.WatchlistsService]] |

**Example:**

To access the [[`markets.MarketsService.getIndexList|getIndexList`]] method of [[`markets.MarketsService|MarketsService`]], we can use:

```ts
indexes = await client.markets.getIndexList(...)
```

### Websockets

The master client also manages a [[ws.WsClient | websocket client]] to handle websocket requests.
The master client shares its state with the websocket client.
The websocket connection is not explicitly made by the client.
This is to avoid making unnecessary connections where websocket operations might not be required.

The websocket client is decoupled from the master client but is kept as part of the master client to abstract the state management.

To start using websockets,
first we need to [initialize the client](#initialize-the-client) and complete a [login](#login-user) request.

#### Creating the connection

```ts
//... imports

const ws = client.ws;

async function main() {
  // ... initialize client
  // ... login

  ws.connect({
    uid: process.env.uid,
    actid: process.env.actid
  });
}
```

#### Subscribing & Unsubscribing

The websocket client can be used to subscribe to multiple topics.
Once subscribed, the client receives the updates from these topics as feeds.
When you no longer requires updates from a topic, you can also unsubscribe from these topics.

The websocket client exposes methods to subscribe and unsubscribe for the following topics:

- Touchline
  - [[`ws.WsClient.subscribeTouchline|subscribeTouchline`]]
  - [[`ws.WsClient.unsubscribeTouchline|unsubscribeTouchline`]]
- Depth
  - [[`ws.WsClient.subscribeDepth|subscribeDepth`]]
  - [[`ws.WsClient.unsubscribeDepth|unsubscribeDepth`]]
- Order update
  - [[`ws.WsClient.subscribeOrder|subscribeOrder`]]
  - [[`ws.WsClient.unsubscribeOrder|unsubscribeOrder`]]

```ts
//... imports

const ws = client.ws;

async function main() {
  // ... initialize client
  // ... login

  try {
    await ws.connect({
      uid: process.env.uid,
      actid: process.env.actid
    });
    // subscribe to touchline
    await ws.subscribeTouchline({
      k: ['NSE','NIFTY']
    });
  }
  catch (error) {
    console.error(error);
  }
}
```

> **Note**: The subscriptions are always done after the connection is made to avoid packet loss.

#### Listening to messages from topics

We were able to subscribe to a topic but how to handle the incoming messages.
Every message from the server is emitted as [rxjs](https://rxjs.dev/) observables from the client.

The [[websocket client | ws.WsClient]] exposes these observables to emit data:

| property                     | details                                                                                |
| ---------------------------- | -------------------------------------------------------------------------------------- |
| [[`ws.WsClient.messages$`]]  | Emits all the messages from the received from the server. (Including acknowledgements) |
| [[`ws.WsClient.touchline$`]] | Emits touchline feeds                                                                  |
| [[`ws.WsClient.depth$`]]     | Emits depth feeds                                                                      |
| [[`ws.WsClient.order$`]]     | Emits order update feeds                                                               |

Once you have subscribed to the topics, you can subscribe to these observables to receive data.

> **Note:** The `subscribe` & `unsubscribe` in observable and [[`ws.WsClient|WsClient`]] is completely different.
> subscribing to observables is a way of reactively extracting data while that in the `WsClient` is an actual request to server.

```ts
//... imports

const ws = client.ws;

async function main() {
  // ... initialize client
  // ... login

  try {
    await ws.connect({
      uid: process.env.uid,
      actid: process.env.actid
    });
    // subscribe to touchline
    await ws.subscribeTouchline({
      k: ['NSE','NIFTY']
    });

    // read data using observables
    ws.touchline$.subscribe(
      (data: IWebsocketMessage) => {
        console.log('Received touchline feed');
        console.log(data);
      }
    );
  }
  catch (error) {
    console.error(error);
  }
}
```

#### Event Handlers

Apart from using observables to listen to data, the [[`ws.WsClient|WsClient`]] also supports registering event handlers.

The client exposes these functions to add and remove event handlers.

| Method                                   | Description                             |
| ---------------------------------------- | --------------------------------------- |
| [[`ws.WsClient.addOnCloseHandler`]]      | add new handler to `onClose` event      |
| [[`ws.WsClient.addOnErrorHandler`]]      | add new handler to `onError` event      |
| [[`ws.WsClient.addOnMessageHandler`]]    | add new handler to `onMessage` event    |
| [[`ws.WsClient.addOnOpenHandler`]]       | add new handler to `onOpen` event       |
| [[`ws.WsClient.removeOnCloseHandler`]]   | remove a handler from `onClose` event   |
| [[`ws.WsClient.removeOnErrorHandler`]]   | remove a handler from `onError` event   |
| [[`ws.WsClient.removeOnMessageHandler`]] | remove a handler from `onMessage` event |
| [[`ws.WsClient.removeOnOpenHandler`]]    | remove a handler from `onOpen` event    |

> **Note:** These event handlers must be added before calling the `connect` method.

```ts
//... imports

const ws = client.ws;

async function main() {
  // ... initialize client
  // ... login

  try {

    let subscription;
    // clear subscriptions on connection closed
    ws.addOnCloseHandler(async () => {
      await ws.subscribeTouchline({
        k: ['NSE', 'NIFTY']
      });
      subscription && subscription.unsubscribe();
    });

    await ws.connect({
      uid: process.env.uid,
      actid: process.env.actid
    });
    // subscribe to touchline
    await ws.subscribeTouchline({
      k: ['NSE','NIFTY']
    });

    // read data using observables
    subscription = ws.touchline$.subscribe(
      (data: IWebsocketMessage) => {
        console.log('Received touchline feed');
        console.log(data);
      }
    );
  }
  catch (error) {
    console.error(error);
  }
}
```