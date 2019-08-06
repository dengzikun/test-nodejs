const http = require('http')
const crypto = require('crypto')

http
  .createServer((req, res) => {
    if (req.url === '/webhook') {
      console.log(req.url)
    }
    res.statusCode = 200
    res.send('ok')
  })
  .listen(8080, () => {
    console.log('listening at 8080')
  })

// app.post('/github', (req, res) => {
//     githubHandler((req,res)=>{

//     })
//   console.log(req.headers)
//   console.log(req.payload)
//   res.status(200).send('ok')
// })

// // app.get('/', (req, res) => {
// //   res.status(200).send('adsf')
// // })

// app.listen(8080, () => {
//   console.log('listening at 8080')
// })
