const mongoose = require('mongoose')
const { mongodb } = require('./config/index')

const url = `mongodb+srv://admin:${mongodb.password}@mynotescluster.fn2my.mongodb.net/my-notes?retryWrites=true`

console.log('connecting to', url)

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(res => console.log('connected to MongoDB'))
  .catch(err => console.log('error connecting to MongoDB:', err.message))

const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean
})

noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Note', noteSchema)
