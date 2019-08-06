const express = require('express')
const app = express()

app.post('/github', (req, res) => {
  console.log(req.headers)
  console.log(req.payload)
  res.status(200).send('ok')
})

// app.get('/', (req, res) => {
//   res.status(200).send('adsf')
// })

app.listen(8080, () => {
  console.log('listening at 8080')
})
