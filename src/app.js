const { initializeListener } = require('./utils/websocket')

if (require.main === module) {
  initializeListener()
}
