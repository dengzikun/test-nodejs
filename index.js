const express = require('express')
const app = express()
const crypto = require('crypto')

const secret = 'mysecret'

function sign(secret, data) {
  return (
    'sha1=' +
    crypto
      .createHmac('sha1', secret)
      .update(data)
      .digest('hex')
  )
}

app.post('/webhook', (req, res) => {
  if (req.headers['x-github-event']) {
    const signature = request.headers['x-hub-signature']
    if (signature === sign(secret, chunk.toString())) {
      console.log('ok')
    }
    console.log(req.headers)
  }
  res.status(200).send('ok')
})

app.listen(8080, () => {
  console.log('listening at 8080')
})
