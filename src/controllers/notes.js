const notesRouter = require('express').Router()
const Note = require('../models/note')

notesRouter.get('/', (req, res) => {
  res.send('Hello world')
})

notesRouter.get('/api/notes', (req, res) => {
  Note.find({}).then(notes => {
    res.json(notes)
  })
})

notesRouter.get('/api/notes/:id', (req, res, next) => {
  const id = req.params.id

  Note
    .findById(id)
    .then(note => {
      if (note) {
        res.json(note)
      } else {
        res.status(404).end()
      }
    })
    .catch(err => next(err))
})

notesRouter.post('/api/notes', (req, res, next) => {
  const body = req.body

  const note = new Note({
    content: body.content,
    important: body.important || false,
    date: new Date()
  })

  note
    .save()
    .then(savedNote => res.json(savedNote))
    .catch(err => next(err))
})

notesRouter.put('/api/notes/:id', (req, res, next) => {
  const id = req.params.id
  const body = req.body

  const note = {
    content: body.content,
    important: body.important
  }

  Note
    .findByIdAndUpdate(id, note, { new: true })
    .then(updatedNote => res.json(updatedNote))
    .catch(err => next(err))
})

notesRouter.delete('/api/notes/:id', (req, res, next) => {
  const id = req.params.id

  Note
    .findByIdAndRemove(id)
    .then(() => res.status(204).end())
    .catch(err => next(err))
})

module.exports = notesRouter
