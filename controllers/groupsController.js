var models = require('../models').models
var User = models.User
var Group = models.Group
// add endpoint for GET on /api/groups/{userId}
/*
    Method GET on route ‘api/groups/{userId}’ - gets all the groups that a user is currently in.
*/
exports.getUserGroups = function(req, res) {
    let userId = req.params.userId

    User
        .findById(userId)
        .catch(function(err) {
            console.error(err)
            res.status(404).send(err)
        })
        .then(function(user) {
            return user.getGroups()
        })
        .then(function(groups) {
            res.status(200).json(groups)
        })
}

/*
    Method POST on route ‘api/groups’ - creates a new group, initially a group with all the fields set, except the memberIds, that at the beginning is an empty array
*/
expor.postGroups = function(req, res) {
    let group = req.body

    Group
        .create(group)
        .catch(function(err) {
            console.error(err)
            res.status(400).send(err)
        })
        .then(function(group) {
            res.status(201).json(group)
        })
}