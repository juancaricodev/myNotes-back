const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const { config } = require('./config/index')
const app = express()

// Mongoose - start
const url = `mongodb+srv://admin:${password}@mynotescluster.fn2my.mongodb.net/my-notes?retryWrites=true`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean
})

const Note = mongoose.model('Note', noteSchema)
// Mongoose - end

const requestLogger = (req, res, next) => {
  console.log('Method:', req.method)
  console.log('Path:  ', req.path)
  console.log('Body:  ', req.body)
  console.log('---')
  next()
}

app.use(express.json())
app.use(cors())
app.use(requestLogger)

let notes = [
  {
    id: 1,
    content: 'HTML is easy',
    date: '2019-05-30T17:30:31.098Z',
    important: true,
    deleted: false
  },
  {
    id: 2,
    content: 'Browser can execute only JavaScript',
    date: '2019-05-30T18:39:34.091Z',
    important: false,
    deleted: false
  },
  {
    id: 3,
    content: 'GET and POST are the most important methods of HTTP protocol',
    date: '2019-05-30T19:20:14.298Z',
    important: true,
    deleted: false
  },
  {
    id: 4,
    content: 'sadf',
    date: '2021-02-21T15:39:03.495Z',
    important: true,
    deleted: true
  },
  {
    id: 5,
    content: 'nota x',
    date: '2021-02-21T15:39:53.116Z',
    important: false,
    deleted: true
  },
  {
    id: 6,
    content: 'nueva nota',
    date: '2021-02-21T15:44:17.357Z',
    important: true,
    deleted: true
  },
  {
    id: 7,
    content: 'Nota de prueba',
    date: '2021-02-21T15:44:31.372Z',
    important: true,
    deleted: true
  },
  {
    id: 8,
    content: 'Nota de a deveras',
    date: '2021-02-21T15:44:58.309Z',
    important: true,
    deleted: true
  },
  {
    id: 9,
    content: 'opasodf',
    date: '2021-02-21T15:45:20.876Z',
    important: false,
    deleted: true
  },
  {
    id: 10,
    content: 'New note for the 10th slot',
    date: '2021-02-21T21:25:43.462Z',
    important: false,
    deleted: false
  },
  {
    id: 11,
    content: 'Nota en español',
    date: '2021-02-21T23:42:21.273Z',
    important: true,
    deleted: true
  },
  {
    id: 12,
    content: 'Note to be deleted',
    date: '2021-02-22T23:29:13.956Z',
    important: false,
    deleted: true
  },
  {
    id: 13,
    content: 'Nueva nota',
    date: '2021-02-23T01:40:05.345Z',
    important: false,
    deleted: true
  },
  {
    id: 14,
    content: 'Notaaaaa',
    date: '2021-02-23T01:47:26.096Z',
    important: true,
    deleted: true
  }
]

app.get('/', (req, res) => {
  res.send('Hello world')
})

app.get('/api/notes', (req, res) => {
  Note.find({}).then(notes => {
    res.json(notes)
  })
})

app.get('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id)
  const note = notes.find(n => n.id === id)
  res.json(note)
})

const generateId = () => {
  const maxId = notes.length > 0
    ? Math.max(...notes.map(n => n.id))
    : 0
  return maxId + 1
}

app.post('/api/notes', (req, res) => {
  const body = req.body

  if (!body.content) {
    return res.status(400).json({
      error: 'content missing'
    })
  }

  const note = {
    id: generateId(),
    content: body.content,
    date: new Date(),
    important: body.important || false,
    deleted: false
  }

  notes = notes.concat(note)

  res.json(note)
})

app.delete('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id)
  notes = notes.filter(n => n.id !== id)
  res.status(204).end()
})

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

app.listen(config.port, () => {
  console.log(`Server listening on port: ${config.port}`)
})
