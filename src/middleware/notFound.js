const notFound = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

module.exports = notFound
