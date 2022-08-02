const env = require('../utils/env')

module.exports = {
  EGRESS_URLS: env('EGRESS_URLS', ''),
  INGRESS_HOST: env('INGRESS_HOST', '127.0.0.1'),
  INGRESS_PORT: env('INGRESS_PORT', '8080'),
  WEBSOCKET_URL: env('WEBSOCKET_URL', ''),
  MODULE_NAME: env('MODULE_NAME', 'Websocket Ingress'),
}
