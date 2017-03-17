var request = require('supertest')
var app = require('../app')
var assert = require('assert')
var Promise = require('bluebird')

context('groups CRUD', function() {
  it('should GET 4 groups', function(done) {
    request(app)
      .get('/api/groups/2')
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err)

        var groups = res.body

        assert.equal(typeof(groups), 'object')
        assert.equal(groups.length, 4)
        
        groups.forEach(function(group) {
          assert.ok(group.id, 'Missing ID')
          assert.ok(group.name, 'Mssing Name')
          assert.ok(group.description, 'Missing description')
        })

        done()
      })

  })
})