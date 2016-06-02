'use strict'
const createServer = require('http-server').createServer

let server = createServer({
  root: ''
})

server.listen(8000, () => {
  console.log('listening')
})
