var express = require('express')
var bodyParser = require('body-parser')
var expressJwt = require('express-jwt')
var jwt = require('jsonwebtoken')
const secret = 'secret'

var app = express()

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

var router = express.Router()
var authController = require('./controllers/authController')
var usersController = require('./controllers/usersController')

router.route('/test')
    .get(function(req, res) {
        res.status(200).send('Hello world!')
    })


// Add endpoints for /api/auth
router.route('/auth')
    .post(authController.postAuth)
    
// Add endpoints for /api/users
router.route('/users')
    .post(usersController.postUsers)

// Add endpoints for /api/users/{userId}
router.route('/users/:userId')
    .put(expressJwt({secret}), usersController.putUser)
    .delete(expressJwt({secret}), usersController.deleteUser)
    .get(expressJwt({secret}), usersController.getUser)

app.get('/', function(req, res) {
    res.status(200).json({
        api: '/api'
    })
})
app.use('/api', router)

module.exports = app