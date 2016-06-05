'use strict'
const createServer = require('http-server').createServer

const server = createServer({
  root: ''
})

server.listen(8000, () => {
  console.log('listening')
})
