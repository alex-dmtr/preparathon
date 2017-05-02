const app = require('./app')
var https = require('https')
var http = require('http')
var pem = require('pem')
var winston = require('winston')
const port = process.env.PORT

pem.createCertificate({days:1, selfSigned:true}, function(err, keys){
  if (err) throw err;
  https.createServer({key: keys.serviceKey, cert: keys.certificate}, app)
    .listen(port, () => {
      winston.info(`https listening on ${port}`)
  });
    
});


