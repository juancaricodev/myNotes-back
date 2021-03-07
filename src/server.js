const express = require('express')
const app = express()

const { config } = require('./config/index')

app.get('/', (req, res) => {
	res.send('Hello world')
})

app.get('/juanca', (req, res) => {
	res.send('Hello Juanca')
})

app.listen(config.port, () => {
  console.log(`Server listening on port: ${config.port}`)
})
