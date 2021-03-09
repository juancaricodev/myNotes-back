const express = require('express')
const app = express()

const { config } = require('./config/index')

const notes = [
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
  res.json(notes)
})

app.listen(config.port, () => {
  console.log(`Server listening on port: ${config.port}`)
})