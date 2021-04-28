const express = require('express')
const cors = require('cors')
const notFound = require('./middleware/notFound')
const errorHandler = require('./middleware/errorHandler')
const requestLogger = require('./middleware/requestLogger')
const app = express()
const { mongodb } = require('../config/index')
const { info, error } = require('../utils/logger')
const { Mongoose } = require('mongoose')

const mongoUrl = mongodb.url

info('connecting to', mongoUrl)

Mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  })
  .then((res) => info('connected to MongoDB'))
  .catch((err) => error('error connecting to MongoDB:', err.message))

app.use(cors())
app.use(express.json())
app.use(requestLogger)

app.use(notFound)
app.use(errorHandler)

module.exports = app
