const WebSocket = require('ws')
const fetch = require('node-fetch')
const { EGRESS_URLS, WEBSOCKET_URL } = require('../config/config.js')
const initializeListener = async () => {
  const client = new WebSocket(WEBSOCKET_URL)
  client.on('message', function message(data) {
    const payload = {
      timestamp: Date.now(),
      data,
    }
    if (EGRESS_URLS) {
      fetch(EGRESS_URLS, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })
    } else {
      console.log(JSON.stringify(payload))
    }
  })
  client.on('open', () => {
    console.log('Connection opened')
  })
  client.on('close', () => {
    console.log('Connection closed')
  })
}

module.exports = {
  initializeListener,
}
