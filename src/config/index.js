require('dotenv').config()

const config = {
  port: process.env.PORT || 3000,
  password: process.env.MONGO_PASS
}

module.exports = { config }
