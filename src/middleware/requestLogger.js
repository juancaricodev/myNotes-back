const { info } = require('../utils/logger')

const requestLogger = (req, res, next) => {
  info('Method:', req.method)
  info('Path:  ', req.path)
  info('Body:  ', req.body)
  info('---')

  next()
}

module.exports = requestLogger
