const app = require('./app')
var https = require('https')
var http = require('http')
var pem = require('pem')
const port = process.env.PORT

pem.createCertificate({days:1, selfSigned:true}, function(err, keys){

  https.createServer({key: keys.serviceKey, cert: keys.certificate}, app)
    .listen(port, () => {
      console.log(`https listening on ${port}`)
  });
    
});


