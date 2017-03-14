var request = require('supertest')
var app = require('../app')

context('API', function() {
    it ('should print out "Hello World!" on /test', function(done) {
        request(app)
            .get('/api/test')
            .expect(200)
            .expect('Hello world!', done)
    })
})