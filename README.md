# Websocket Ingress

|                |                                                                                           |
| -------------- | ----------------------------------------------------------------------------------------- |
| Name           | Websocket Ingress                                                                         |
| Version        | v1.0.0                                                                                    |
| Dockerhub Link | [beetaone/websocket-ingress](https://hub.docker.com/r/beetaone/websocket-ingress) |
| Authors        | Mesud Pasic                                                                               |

- [Websocket Ingress](#websocket-ingress)
  - [Description](#description)
  - [Features](#features)
  - [Environment Variables](#environment-variables)
    - [Module Specific](#module-specific)
    - [Set by the beetaone Agent on the edge-node](#set-by-the-beetaone-agent-on-the-edge-node)
  - [Dependencies](#dependencies)

## Description

The module should connect to Websocket endpoint and listen for incoming messages. Then forward the payload to next module in beetaone appropriate JSON format.

## Environment Variables

| Environment Variables | type   | Description      |
| --------------------- | ------ | ---------------- |
| WEBSOCKET_URL         | string | URL of websocket |

### Module Specific

### Set by the beetaone Agent on the edge-node

| Environment Variables | type   | Description               |
| --------------------- | ------ | ------------------------- |
| MODULE_NAME           | string | Name of the module        |
| INGRESS_HOST          | string | Host where app is running |
| INGRESS_PORT          | string | Port where app is running |

## Incoming payload can look like this

```js

{
   "cmd": "rx",
   "seqno": 2091,
   "EUI": "24DD24538B444729",
   "ts": 1658752736930,
   "fcnt": 847,
   "port": 85,
   "freq": 868500000,
   "rssi": -17,
   "snr": 8,
   "toa": 56,
   "dr": "SF7 BW125 4/5",
   "ack": false,
   "bat": 254,
   "offline": false,
   "data": "017564030001045555"
}	

```
## Outgoing payload looks like this

```js

{
  "timestamp":1659608431851,
  "data":{
    "cmd": "rx",
    "seqno": 2091,
    "EUI": "24DD24538B444729",
    "ts": 1658752736930,
    "fcnt": 847,
    "port": 85,
    "freq": 868500000,
    "rssi": -17,
    "snr": 8,
    "toa": 56,
    "dr": "SF7 BW125 4/5",
    "ack": false,
    "bat": 254,
    "offline": false,
    "data": "017564030001045555"
  }
}	

```

## Dependencies

```js
"dependencies": {
    "body-parser": "^1.19.2",
    "express": "^4.17.3",
    "express-winston": "^4.2.0",
    "node-fetch": "^2.6.1",
    "winston": "^3.6.0",
    "ws": "^8.8.1"
}
```