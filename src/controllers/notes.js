const notesRouter = require('express').Router()
const Note = require('../models/note')

notesRouter.get('/', async (req, res) => {
  const notes = await Note.find({})
  res.json(notes)
})

notesRouter.get('/:id', async (req, res, next) => {
  const id = req.params.id

  try {
    const note = await Note.findById(id)

    if (note) {
      res.json(note)
    } else {
      res.status(404).end()
    }
  } catch (err) {
    next(err)
  }
})

notesRouter.post('/', async (req, res, next) => {
  const body = req.body

  const note = new Note({
    content: body.content,
    important: body.important || false,
    date: new Date()
  })

  try {
    const savedNote = await note.save()

    res.json(savedNote)
  } catch (err) {
    next(err)
  }
})

notesRouter.put('/:id', async (req, res, next) => {
  const id = req.params.id
  const body = req.body

  const note = {
    content: body.content,
    important: body.important
  }

  try {
    const updatedNote = await Note.findByIdAndUpdate(id, note, { new: true })

    res.json(updatedNote)
  } catch (err) {
    next(err)
  }
})

notesRouter.delete('/:id', async (req, res, next) => {
  const id = req.params.id

  try {
    await Note.findByIdAndRemove(id)

    res.status(204).end()
  } catch (err) {
    next(err)
  }
})

module.exports = notesRouter
