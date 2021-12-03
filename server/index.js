const express = require('express')
const zmq = require('./zeroindex.js')
const path = require('path')

const app = express()
const port = 3001

console.log(path.join(__dirname, 'public'))


app.use(express.static(path.join(__dirname, '../public')));


app.get('/', (req, res) => {
  res.status(200).send('hello server world')
})

app.get('/market', (req, res) => {
  res.status(200).send('response')
})

app.listen(port, () => {
  console.log(`EDTradelines listening at http://localhost:${port}`)
})