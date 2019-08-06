const express = require('express')
const app = express()
const bodyParser = require('body-parser')
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

app.use(
  bodyParser.json({
    verify: function(req, res, buf, encoding) {
      req.rawBody = buf
    }
  })
)
app.use(bodyParser.urlencoded({ extended: false }))

app.post('/webhook', (req, res) => {
  if (req.headers['x-github-event']) {
    req.reqData = Buffer.concat(reqData, size)
    const signature = req.headers['x-hub-signature']
    if (signature === sign(secret, req.rawBody)) {
      console.log(req.headers)
      console.log(req.body)
      console.log('ok')
      res.status(200).send('ok')
    }
  }
})

// app.post('/webhook', (req, res) => {
//   console.log(req.body)
//   if (req.headers['x-github-event']) {
//     const reqData = []
//     let size = 0
//     req.on('data', (data) => {
//       console.log('>>>req on')
//       reqData.push(data)
//       size += data.length
//     })
//     req.on('end', () => {
//       req.reqData = Buffer.concat(reqData, size)
//       const signature = req.headers['x-hub-signature']
//       if (signature === sign(secret, req.reqData)) {
//         console.log(req.headers)
//         console.log('ok')
//         res.status(200).send('ok')
//       }
//     })
//   }
// })

app.listen(8080, () => {
  console.log('listening at 8080')
})
