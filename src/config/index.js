require('dotenv').config()

const config = {
  port: process.env.PORT || 3000
}

let mongoUrl

if (process.env.NODE_ENV === 'test') {
  mongoUrl = process.env.MONGO_URI_TEST
} else {
  mongoUrl = process.env.MONGO_URI
}

const mongodb = {
  password: process.env.MONGO_PASS,
  url: mongoUrl
}

module.exports = { config, mongodb }
