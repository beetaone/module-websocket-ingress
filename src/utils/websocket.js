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
      const urls = []
      const eUrls = EGRESS_URLS.replace(/ /g, '')
      if (eUrls.indexOf(',') !== -1) {
        urls.push(...eUrls.split(','))
      } else {
        urls.push(eUrls)
      }
      urls.forEach(async url => {
        if (url) {
          try {
            const callRes = await fetch(url, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(payload),
            })
            if (!callRes.ok) {
              console.error(`Error passing response data to ${url}, status: ${callRes.status}`)
            }
          } catch (e) {
            console.error(`Error making request to: ${url}, error: ${e.message}`)
          }
        }
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
