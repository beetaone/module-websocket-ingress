# Websocket Ingress

|                |                                                                                           |
| -------------- | ----------------------------------------------------------------------------------------- |
| Name           | Websocket Ingress                                                                         |
| Version        | v1.0.0                                                                                    |
| Dockerhub Link | [weevenetwork/websocket-ingress](https://hub.docker.com/r/weevenetwork/websocket-ingress) |
| Authors        | Mesud Pasic                                                                               |

- [Websocket Ingress](#websocket-ingress)
  - [Description](#description)
  - [Features](#features)
  - [Environment Variables](#environment-variables)
    - [Module Specific](#module-specific)
    - [Set by the weeve Agent on the edge-node](#set-by-the-weeve-agent-on-the-edge-node)
  - [Dependencies](#dependencies)

## Description

The module should connect to Websocket endpoint and listen for incoming messages. Then forward the payload to next module in weeve appropriate JSON format.

## Environment Variables

| Environment Variables | type   | Description      |
| --------------------- | ------ | ---------------- |
| WEBSOCKET_URL         | string | URL of websocket |

### Module Specific

### Set by the weeve Agent on the edge-node

| Environment Variables | type   | Description               |
| --------------------- | ------ | ------------------------- |
| MODULE_NAME           | string | Name of the module        |
| INGRESS_HOST          | string | Host where app is running |
| INGRESS_PORT          | string | Port where app is running |

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
