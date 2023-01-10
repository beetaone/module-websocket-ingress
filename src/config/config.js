const env = require('../utils/env')

module.exports = {
  EGRESS_URLS: env('EGRESS_URLS', ''),
  WEBSOCKET_URL: env('WEBSOCKET_URL', ''),
  MODULE_NAME: env('MODULE_NAME', 'Websocket Ingress'),
}
