var request = require('supertest')
var app = require('../app')
var assert = require('assert')
var Promise = require('bluebird')

context('groups CRUD', function() {
  it('should read 4 groups for user 2', function(done) {
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

  let group =
  {
    name: 'fun group',
    description: 'much fun',
    avatarUrl: 'basic.png'
  }
  it('should create a group', function(done) {
    request(app)
      .post('/api/groups')
      .send(group)
      .expect(201)
      .end(function(err, res) {
        if (err) return done(err)

        let newGroup = res.body

        assert.equal(group.name, newGroup.name)
        assert.equal(group.description, newGroup.description)
        assert.equal(group.avatarUrl, newGroup.avatarUrl)

        group = newGroup
        done()
      })
  })

  it('should update the group', function(done) {
    group.name = 'funnier group'
    group.description = 'much more fun'
    group.avatarUrl = 'awesome.png'

    request(app)
      .put(`/api/group/${group.id}`)
      .send(group)
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err)

        let newGroup = res.body

        assert.equal(group.name, newGroup.name)
        assert.equal(group.description, newGroup.description)
        assert.equal(group.avatarUrl, newGroup.avatarUrl)

        group = newGroup
        done()
      })
  })

  it('should read the same group', function(done) {
  request(app)
    .get(`/api/group/${group.id}`)
    .expect(200)
    .expect(group, done)
  })

  it('should put user 2 in the group', function(done) {
    request(app)
      .put(`/api/group/${group.id}/add/2`)
      .expect(201, done)
  })

  it('should get group members and find member 2', function(done) {
    request(app)
      .get(`/api/group/${group.id}/members`)
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err)
        var members = res.body

        assert.equal(members.length, 1)

        assert.equal(members[0].id, 2)

        done()
      })
  })

  it('should remove member 2 from group', function(done) {
    request(app)
      .delete(`/api/group/${group.id}/remove/2`)
      .expect(200, done)
  })

  it('should delete the group', function(done) {
    request(app)
      .delete(`/api/group/${group.id}`)
      .expect(200, done)
  })

})