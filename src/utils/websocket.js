const WebSocket = require('ws')
const fetch = require('node-fetch')
const { EGRESS_URLS, WEBSOCKET_URL } = require('../config/config.js')

const initializeListener = async () => {
  const client = new WebSocket(WEBSOCKET_URL)
  client.on('message', async function message(data) {
    console.log(`Received data: ${data}`)
    let decodedData = data
    try {
      decodedData = JSON.parse(data.toString())
    } catch (e) {
      decodedData = data.toString()
    }
    const payload = {
      timestamp: Date.now(),
      data: decodedData,
    }
    if (EGRESS_URLS) {
      const eUrls = EGRESS_URLS.replace(/ /g, '')
      const urls = eUrls.split(',')

      await Promise.all(
        urls.map(async url =>
          fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          }).catch(e => {
            console.error(`Error making request to: ${url}, error: ${e.message}`)
            throw e
          })
        )
      ).catch(e => console.error(e))

      console.log('Data sent to egress')
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
