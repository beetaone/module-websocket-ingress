const WebSocket = require('ws')
const fetch = require('node-fetch')
const { EGRESS_URLS, WEBSOCKET_URL } = require('./config/config.js')

const client = new WebSocket(WEBSOCKET_URL)

client.on('message', async function message(data) {
  console.log(`Received data: ${data}`)
  let decodedData
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
    const urls = EGRESS_URLS.replace(/ /g, '').split(',')
    await Promise.all(
      urls.map(async url =>
        fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        }).then(res => {
          console.log(`Response from ${url}: ${res.status}`)
        })
      )
    )
      .then(() => {
        console.log('Data sent to egress')
      })
      .catch(e => {
        console.error(e.message)
      })
  } else {
    console.error('EGRESS_URLS is not provided.')
  }
})

client.on('open', () => {
  // TODO: Add subscriptions to ws ingress
  console.log('Connection opened')
})

client.on('close', () => {
  console.log('Connection closed')
})

client.on('error', error => {
  console.error(`An error occurred: ${error.message}`)
})
