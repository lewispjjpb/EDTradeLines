const express = require('express')
const zmq = require('./zeroindex.js')
const path = require('path')
const db = require('../database/mongoschema.js')

const app = express()
const port = 3001

console.log(path.join(__dirname, 'public'))


app.use(express.static(path.join(__dirname, '../public')));


app.get('/', (req, res) => {
  res.status(200).send('hello server world')
})

app.get('/market', (req, res) => {
  db.getMarket()
    .then(results => {res.status(200).send(results)})
    .catch(err => res.status(500).send(err))
  })

app.listen(port, () => {
  console.log(`EDTradelines listening at http://localhost:${port}`)
})