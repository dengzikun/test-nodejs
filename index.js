const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const crypto = require('crypto')
const Kafka = require('no-kafka')
const producer = new Kafka.Producer({
  connectionString: 'kafka://192.168.1.19:9092'
})

// test

// test

// test

// test

// test

const secret = 'mysecret'

async function kafkaInit() {
  console.log('asdfadsf')
  await producer.init()
  console.log('111111')
  await producer.send({
    topic: 'sun',
    partition: 0,
    message: {
      value: 'Hello!'
    }
  })
}

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
app.use(bodyParser.urlencoded({ extended: true }))

app.post('/webhook', (req, res) => {
  if (req.headers['x-github-event']) {
    const signature = req.headers['x-hub-signature']
    if (signature === sign(secret, req.rawBody)) {
      console.log(req.headers)
      console.log(req.body)
      console.log('ok')
      res.status(200).send('ok')
    }
  } else {
    if (req.headers.authorization) {
      let str = req.headers.authorization
      str = str.slice(6, str.length)
      console.log(str)

      let str1 = Buffer.from(str, 'base64').toString()
      console.log(str1)
      if (str1 === 'test:1234') {
        console.log('authorization')
        console.log(req.body)
      }
    }
    console.log('azure')
    console.log(req.headers)
    res.status(200).send('azure')
  }
})

// kafkaInit()
//   .then(() => {
//     app.listen(8080, () => {
//       console.log('listening at 8080')
//     })
//   })
//   .catch((err) => {
//     console.log(err)
//   })

kafkaInit()
  .then(() => {
    console.log('kafka ok')
  })
  .catch((err) => {
    console.log(err)
  })
