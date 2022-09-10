const WebSocket = require('ws')
const fetch = require('node-fetch')
const { EGRESS_URLS, WEBSOCKET_URL } = require('../config/config.js')
const initializeListener = async () => {
  const client = new WebSocket(WEBSOCKET_URL)
  client.on('message', function message(data) {
    console.log(`Received data: ${data}`)
    const payload = {
      timestamp: Date.now(),
      data,
    }
    if (EGRESS_URLS) {
      const eUrls = EGRESS_URLS.replace(/ /g, '')
      const urls = eUrls.split(',')
      urls.forEach(async url => {
        if (url) {
          try {
            console.log(`Sending data to ${url}`)
            const callRes = await fetch(url, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(payload),
            })
            if (!callRes.ok) {
              console.error(`Error passing response data to ${url}, status: ${callRes.status}`)
            } else {
              console.log(`Data sent successfully.`)
            }
          } catch (e) {
            console.error(`Error making request to: ${url}, error: ${e.message}`)
          }
        }
      })
    } else {
      console.error('EGRESS_URLS is not provided.')
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
