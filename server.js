const app = require('./app')
var https = require('https')
var http = require('http')
var fs = require('fs')
const port = process.env.PORT

var hskey = fs.readFileSync('./cert/hacksparrow-key.pem')
var hscert = fs.readFileSync('./cert/hacksparrow-cert.pem')

var options = {
  key: hskey,
  cert: hscert
}

https.createServer(options, app).listen(port)


console.log(`https on port ${port}`)