const app = require('./app')
const fs = require('fs')
const PORT = 8000

app.listen(PORT, '0.0.0.0', () => {
  console.log('Running at 0.0.0.0:' + PORT)
  console.log('Check out these examples:')
  fs.readdirSync(__dirname)
    .filter((fileName) => fileName.match(/\.html$/))
    .map((fileName) => console.log('- http://localhost:' + PORT + '/' + fileName))
})
