const WebSocket = require('ws')
const fetch = require('node-fetch')
const { EGRESS_URLS, WEBSOCKET_URL } = require('./config/config.js')

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
    console.log({
      urls,
      eUrls,
    })
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
  // const subscribeMessage = JSON.stringify({
  //   event: 'bts:subscribe',
  //   data: {
  //     channel: 'live_trades',
  //   },
  // })
  // client.send(subscribeMessage)
})

client.on('close', () => {
  console.log('Connection closed')
})
