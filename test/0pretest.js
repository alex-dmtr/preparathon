var request = require('supertest')
var app = require('../app')
var assert = require('assert')
var db = require('../models')

context('DB', function() {
		it('should connect to DB', function() {
				return db
						.authenticate()
		})

		it('should sync tables', function() {
				return db
						.sync({force:true})
		})

		it('should seed', function() {
			return db
				.seed()
		})


})


