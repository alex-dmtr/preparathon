var request = require('supertest')
var app = require('../app')
const db = require('../db')

context('DB', function() {
    it('should connect to DB', function(done) {
        db
            .authenticate()
            .then(done)
            .catch(done)
    })

})
context('API', function() {
    it ('should print out "Hello World!" on /test', function(done) {
        request(app)
            .get('/api/test')
            .expect(200)
            .expect('Hello world!', done)
    })

})