require('dotenv').config()
/* Add following environment variables in .env: */
let envVars = 
[
    "DB_HOST", 
    "DB_USERNAME", 
    "DB_PASSWORD", 
    "JWT_SECRET",
    "ROOT_USERNAME",
    "ROOT_PASSWORD"
]

var assert = require('assert')

envVars.forEach((value) => assert.ok(process.env[value], `${value} not set`))

var express = require('express')
var bodyParser = require('body-parser')
var expressJwt = require('express-jwt')

var jwt = require('jsonwebtoken')
var app = express()

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

var router = express.Router()
var authController = require('./controllers/authController')
var groupsController = require('./controllers/groupsController')
var usersController = require('./controllers/usersController')

// Add endpoints for /api/auth
router.route('/auth')
    .post(authController.postAuth)
    
// Add endpoints for /api/groups/{userId}
router.route('/groups/:userId')
    .get(groupsController.getUserGroups)

// Add endpoints for /api/groups
router.route('/groups')
    .post(groupsController.postGroups)

// Add endpoints for /api/group/{groupId}
router.route('/group/:groupId')
    .put(groupsController.putGroup)
    .get(groupsController.getGroup)
    .delete(groupsController.deleteGroup)

// Add endpoints for /api/group/{groupId}/members
router.route('/group/:groupId/members')
    .get(groupsController.getGroupMembers)


// Add endpoint for /api/group/:groupId/add/:userId
router.route('/group/:groupId/add/:userId')
    .put(groupsController.putGroupMember)

// Add endpoint for /api/group/:groupId/add/:userId
router.route('/group/:groupId/remove/:userId')
    .delete(groupsController.deleteGroupMember)

// Add endpoints for /api/users
router.route('/users')
    .post(usersController.postUsers)

// Add endpoints for /api/users/{userId}
router.route('/users/:userId')
    .put(expressJwt({secret: process.env.JWT_SECRET}), usersController.putUser)
    .delete(expressJwt({secret: process.env.JWT_SECRET}), usersController.deleteUser)
    .get(expressJwt({secret: process.env.JWT_SECRET}), usersController.getUser)

app.get('/', function(req, res) {
    res.status(200).json({
        api: '/api'
    })
})
app.use('/api', router)

module.exports = app