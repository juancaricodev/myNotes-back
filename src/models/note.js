const mongoose = require('mongoose')
// const { mongodb } = require('../config/index')
// const { info, error } = require('../utils/logger')

// const url = mongodb.url

// info('connecting to', url)

// mongoose
//   .connect(url, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useFindAndModify: false,
//     useCreateIndex: true
//   })
//   .then((res) => info('connected to MongoDB'))
//   .catch((err) => error('error connecting to MongoDB:', err.message))

const noteSchema = new mongoose.Schema({
  content: {
    type: String,
    minlength: 5,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
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
