var express = require('express')
var app = express()

var router = express.Router()
var usersController = require('./controllers/usersController')

router.route('/test')
    .get(function(req, res) {
        res.status(200).send('Hello world!')
    })

// Add endpoints for /api/users
router.route('/users')
    .post(usersController.postUsers)

// Add endpoints for /api/users/{userId}
router.route('/users/:userId')
    .put(usersController.putUser)
    .delete(usersController.deleteUser)
    .get(usersController.getUser)

app.get('/', function(req, res) {
    res.status(200).json({
        api: '/api'
    })
})
app.use('/api', router)

module.exports = app