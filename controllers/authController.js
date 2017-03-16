var User = require('../models').models.user
var jwt = require('jsonwebtoken')

// add endpoint for POST on /api/auth
// should receive username and password
exports.postAuth = function(req, res) {
    User
        .findOne({
            where: {
                username: req.body.username
            }
        })
        .catch(function(err) {
            throw err
            res.status(401).send(err)
        })
        .then(function(result) {

            if (req.body.password == result.password)
            {
                var token = jwt.sign({username: result.username, id: result.id}, process.env.JWT_SECRET)
                res.status(200).json({jwt:token})
            }
            else
                res.status(401).json({message: 'Authentication failed'})
        })

}