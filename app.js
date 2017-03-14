var express = require('express')
const db = require('./db')

var app = express()

var router = express.Router()

router.route('/test')
    .get(function(req, res) {
        res.status(200).send('Hello world!')
    })

app.get('/', function(req, res) {
    res.status(200).json({
        api: '/api'
    })
})
app.use('/api', router)

module.exports = app