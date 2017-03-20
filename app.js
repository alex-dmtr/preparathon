require('dotenv').config()
/* Add following environment variables in .env: */
let envVars =
[
    "DB_HOST",
    "DB_NAME",
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
var jwtMiddleware = expressJwt({secret: process.env.JWT_SECRET})
var app = express()

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

var router = express.Router()
var authController = require('./controllers/authController')
var groupsController = require('./controllers/groupsController')
var postsController = require('./controllers/postsController')
var usersController = require('./controllers/usersController')

// Add endpoints for /api/auth
router.route('/auth')
    .post(authController.postAuth)

// Add endpoints for /api/groups/{userId}
router.route('/groups/:userId')
    .get(jwtMiddleware, groupsController.getUserGroups)

// Add endpoints for /api/groups
router.route('/groups')
    .post(jwtMiddleware, groupsController.postGroups)

// Add endpoints for /api/group/{groupId}
router.route('/group/:groupId')
    .put(jwtMiddleware, groupsController.putGroup)
    .get(jwtMiddleware, groupsController.getGroup)
    .delete(jwtMiddleware, groupsController.deleteGroup)

// Add endpoints for /api/group/{groupId}/members
router.route('/group/:groupId/members')
    .get(jwtMiddleware, groupsController.getGroupMembers)

// Add endpoint for /api/group/:groupId/add/:userId
router.route('/group/:groupId/add/:userId')
    .put(jwtMiddleware, groupsController.putGroupMember)

// Add endpoint for /api/group/:groupId/add/:userId
router.route('/group/:groupId/remove/:userId')
    .delete(jwtMiddleware, groupsController.deleteGroupMember)

router.route('/group/:groupId/post')
    .post(jwtMiddleware, postsController.postPost)

router.route('/group/:groupId/post/:postId')
    .put(jwtMiddleware, postsController.putPost)
    .delete(jwtMiddleware, postsController.deletePost)

// Add endpoints for /api/users
router.route('/users')
    .post(usersController.postUsers)

// Add endpoints for /api/users/{userId}
router.route('/users/:userId')
    .put(jwtMiddleware, usersController.putUser)
    .delete(jwtMiddleware, usersController.deleteUser)
    .get(jwtMiddleware, usersController.getUser)

app.get('/', function(req, res) {
    res.status(200).json({
        api: '/api'
    })
})
app.use('/api', router)

module.exports = app
