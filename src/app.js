const { mongodb } = require('./config/index')
const express = require('express')
const app = express()
const cors = require('cors')
const notesRouter = require('./controllers/notes')
const requestLogger = require('./middleware/requestLogger')
const notFound = require('./middleware/notFound')
const errorHandler = require('./middleware/errorHandler')
const { info, error } = require('./utils/logger')
const mongoose = require('mongoose')

const mongoUrl = mongodb.url

info('connecting to', mongoUrl)

mongoose
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

app.use('/api/notes', notesRouter)

app.use(notFound)
app.use(errorHandler)

module.exports = app
