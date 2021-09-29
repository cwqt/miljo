# serverless

taking some inspo from my current place of work, make everything using the serverless special sauce

the whole cloud part will be TypeScript (just because I can knock this out super fast), [sst](https://docs.serverless-stack.com/) deployed via [seed.run](https://seed.run/) using [PlanetScale](https://planetscale.com/) as the general data store with [Prisma](https://www.prisma.io/), measurement data being stored in [TimeStream](https://aws.amazon.com/timestream/), EDA via [EventBridge](https://aws.amazon.com/eventbridge/)

![stack](https://ftp.cass.si/19~26kM56.png)

# Some high level assumptions

- Assume all devices are always connected & able to recieve/send data
  - I'm not interested how the data arrives/is sent to/from a device, BLE, radio, Wi-Fi whatever; that's a separate issue entirely
- Time sensitivity is not super important
- Graphs of devices is a problem space I'm going to ignore, i.e. devices sending other devices messages that send those devices messages etc.

## application / user management

- users (pretty self explanatory)
- api keys (permissions for devices)

controlling data flow + utilities for visualising data

- scopes (varying levels of granualarity, e.g. scoped to a building or room)
- groups (monitorables assigned to a group)

## device management

- node (things that can have signals scoped on them & optionally behaviours)
  - template (what the node can actually do, see actuators)
- transducer (converts energy from one form to another, e.g. electrical to light or vice versa)
  - sensors (things that ingest signals)
  - actuators (things that output signals)
    - sensors & actuators attachable to templates

transmitting data

- packet, for routing use a flood with ttl - just the simplest to implement
  - have each node record every packet & only transmit once
  - hop count for cycles

<!-- prettier-ignore -->
```ts
export type Ref = string;
export type Data = string | number | boolean;
export type RequestType = "MUT" | "QRY";
export type Request = `QRY:${Ref}` | `MUT:${Ref}:${Data}`;

interface Packet {
  pid: string;  // packet id
  ttl: number;  // time to live
  sig: string;  // signed hash from nid api key
  iat: number;  // issue timestamp
}

// server --> node
interface TxPacket extends Packet {
  sub: string     // node id
  val: Request[]; // schema action
}

export type ResponseType = "ACK" | "NAK"
export type Response = `ACK` | `NAK:${number}`;

// node --> server
interface RxPacket extends Packet {
  sub: "@";       // special subject meaning cloud
  val: Response[] // index mapped response to request messages
}
```

for example, a request to node 10 to turn on a light & query current light state

```json
{
  "ttl": 20,
  "pid": "34177f6a0a",
  "sub": "170aa6112dz",
  "sig": "dbefff2ba4997039683abf6f7f4a91f54400866f95077865553c6b5017885de7",
  "iat": 1631049443,
  "val": ["MUT:switch_1:HIGH", "QRY:light_1"]
}
```

175 bytes

and the corresponding response, assuming the MUT succeded and QRY failed with error code 01

```json
{
  "ttl": 10,
  "pid": "34177f6a0a",
  "sub": "@",
  "sig": "543f3216ef0b754c75563786207cad24153c83c5958bd21cc8edd048c3538b01",
  "iat": 1631049443,
  "val": ["ACK", "NAK:01"]
}
```

146 bytes

### what's `sig`

- asymmetric key exchange (through whatever means, gateway node or programmed in)
- `val` hashed via HMAC SHA-256

### sensors

```
raw reading (voltage) --> transform/normalise --> valuable data

e.g.

0 - 5v mapping 0c - 100c
  |
  v
transform x / 5 * 100
  |
  | e.g. 2.5v
  v
2.5/5 * 100 = 50c
```

### actuators

lets go with a simple example, toggling a pin between a high or low state

```
{
  type: "MUT",
  value:
}
```

## rule engine

- triggers (things that should result in a change in state, can be createed by user action, timebased or in response to a sensor value etc.)
- workflows (a set of actions to follow in reactance to a trigger, e.g. turn on a light)

## edge interface

- data transforms, validation, etc.
- interface schema
  - devices are dumb, store no internal state and merely react to incoming commands / queries

## graphql

- no more rest please

![uml](https://ftp.cass.si/634Ne=8g1.png)


## timeseries data

- storage: aws timestream, serverless

## hardware

- rust, wanting to learn this for ages
