const express = require('express')
const app = express()

app.post('/webhook', (req, res) => {
  if (req.headers['x-github-event']) {
    console.log(req.headers)
  }
  res.status(200).send('ok')
})

app.listen(8080, () => {
  console.log('listening at 8080')
})
