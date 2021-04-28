const express = require('express')
const cors = require('cors')
const { config } = require('./config/index')
const notFound = require('./middleware/notFound')
const errorHandler = require('./middleware/errorHandler')
const requestLogger = require('./middleware/requestLogger')
const app = express()

app.use(cors())
app.use(express.json())
app.use(requestLogger)

app.use(notFound)
app.use(errorHandler)

module.exports = app
