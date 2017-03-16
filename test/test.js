var request = require('supertest')
var app = require('../app')
var assert = require('assert')
var db = require('../models')

before('DB', function() {
    it('should connect to DB', function() {
        return db
            .authenticate()
    })

    it('should sync tables', function() {
        return db
            .sync({force:true})
    })

})
context('API', function() {
    it ('should print out "Hello World!" on /api/test', function(done) {
        request(app)
            .get('/api/test')
            .expect(200)
            .expect('Hello world!', done)
    })

    context('users CRUD', function() { 

        let user = { 
            username: 'obi-wan', 
            email: 'jedi@jedi.com',
            description: 'Badass Jedi Knight', 
            password: 'kenobi',
            avatarUrl: 'kenobi.jpg',
            age: 32,
            currentProject: 'Clone Wars',
            agency: 'Brasov'
        }

        it('should create a user', function(done) {
            request(app)
                .post('/api/users')
                .send(user)
                .expect(201)
                .end(function(err, res) {
                    if (err) return done(err)

                    user.id = res.body.id
                    
                    done()
                })
        }) 

        
        it('should read the same user', function(done) {
            request(app)
                .get(`/api/users/${user.id}`)
                .expect(200)
                .end(function(err, result) {
                    if (err) return done(err)

                    let res = result.body

                    assert.equal(user.username, res.username)
                    assert.equal(user.email, res.email)
                    assert.equal(user.description, res.description)
                    assert.equal(user.avatarUrl, res.avatarUrl)
                    assert.equal(user.age, res.age)
                    assert.equal(user.currentProject, res.currentProject)
                    assert.equal(user.agency, res.agency)

                    done()
                })
        })

        it('should update the user', function(done) {
            user.email = 'oldjedi@jedi.com'

            request(app)
                .put(`/api/users/${user.id}`)
                .send(user)
                .expect(200)
                .end(function(err, result) {
                    if (err) return done(err)

                    let res = result.body

                    assert.equal(user.email, res.email)

                    done()
                })
        })

        it('should delete the user', function(done) {
            request(app)
                .delete(`/api/users/${user.id}`)
                .expect(200, done)
        })

    })

})
