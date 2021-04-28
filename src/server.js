const app = require('./app')
const http = require('http')
const config = require('./config/index')
const { info } = require('./utils/logger')

const server = http.createServer(app)

server.listen(config.port, () => {
  info(`Server listening on port: ${config.port}`)
})
