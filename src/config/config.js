const env = require('../utils/env')

module.exports = {
  EGRESS_URLS: env('EGRESS_URLS', ''),
  MODULE_NAME: env('MODULE_NAME', 'Websocket Ingress'),
  WEBSOCKET_URL: env('WEBSOCKET_URL', ''),
}
