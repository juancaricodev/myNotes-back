// const express = require('express')
// const cors = require('cors')
// const { config } = require('./config/index')
// const notFound = require('./middleware/notFound')
// const errorHandler = require('./middleware/errorHandler')
// const requestLogger = require('./middleware/requestLogger')
// const Note = require('./models/note')

// const app = express()

// const requestLogger = (req, res, next) => {
//   console.log('Method:', req.method)
//   console.log('Path:  ', req.path)
//   console.log('Body:  ', req.body)
//   console.log('---')
//   next()
// }

// app.use(cors())
// app.use(express.json())
// app.use(requestLogger)

// app.get('/', (req, res) => {
//   res.send('Hello world')
// })

// app.get('/api/notes', (req, res) => {
//   Note.find({}).then(notes => {
//     res.json(notes)
//   })
// })

// app.get('/api/notes/:id', (req, res, next) => {
//   const id = req.params.id

//   Note
//     .findById(id)
//     .then(note => {
//       if (note) {
//         res.json(note)
//       } else {
//         res.status(404).end()
//       }
//     })
//     .catch(err => next(err))
// })

// app.post('/api/notes', (req, res, next) => {
//   const body = req.body

//   const note = new Note({
//     content: body.content,
//     important: body.important || false,
//     date: new Date()
//   })

//   note
//     .save()
//     .then(savedNote => res.json(savedNote))
//     .catch(err => next(err))
// })

// app.put('/api/notes/:id', (req, res, next) => {
//   const id = req.params.id
//   const body = req.body

//   const note = {
//     content: body.content,
//     important: body.important
//   }

//   Note
//     .findByIdAndUpdate(id, note, { new: true })
//     .then(updatedNote => res.json(updatedNote))
//     .catch(err => next(err))
// })

// app.delete('/api/notes/:id', (req, res, next) => {
//   const id = req.params.id

//   Note
//     .findByIdAndRemove(id)
//     .then(() => res.status(204).end())
//     .catch(err => next(err))
// })

// const unknownEndpoint = (req, res) => {
//   res.status(404).send({ error: 'unknown endpoint' })
// }

// app.use(notFound)

// const errorHandler = (err, req, res, next) => {
//   console.error(err.message)

//   if (err.name === 'CastError') {
//     return res.status(400).send({ error: 'malformatted id' })
//   } else if (err.name === 'ValidationError') {
//     return res.status(400).json({ error: err.message })
//   }

//   next(err)
// }

// app.use(errorHandler)

const app = require('./app')
const http = require('http')
const config = require('./config/index')
const { info } = require('./utils/logger')

const server = http.createServer(app)

server.listen(config.port, () => {
  info(`Server listening on port: ${config.port}`)
})
