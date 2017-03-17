var models = require('../models').models
var User = models.User
var Group = models.Group
// add endpoint for GET on /api/groups/{userId}
/*
    Method GET on route ‘api/groups/{userId}’ - gets all the groups that a user is currently in.
*/

// nu ar fi mai bine ca asta sa fie in '/api/users/{userId}/groups'?
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
exports.postGroups = function(req, res) {
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

/*
    Method PUT on route ‘api/groups/{groupId}’ - updates a current group. It should update only the fields “name”, “description” and “avatarUrl”.
*/  
exports.putGroup = function(req, res) {
    let group = req.body
    group.id = req.params.groupId

    Group
        .findById(group.id)
        .catch(function(err) {
            console.error(err)
            res.status(404).send(err)
        })
        .then(function(result) {
            return result
                .update(group)
        })
        .catch(function(err) {
            console.error(err)
            res.status(400).send(err)
        })
        .then(function(result) {
            res.status(200).send(result)
        })
}

/*
    Method GET on route ‘api/groups/{groupId}’ - gets data about a current group.
*/
exports.getGroup = function(req, res) {
    let groupId = req.params.groupId

    Group
        .findById(groupId)
        .catch(function(err) {
            console.error(err)
            res.status(404).send(err)
        })
        .then(function(group) {
            res.status(200).send(group)
        })
}

/*
    Method GET on route ‘api/groups/{groupId}/members’ - gets all the members from a group.
*/
exports.getGroupMembers = function(req, res) {
    let groupId = req.params.groupId

     Group
        .findById(groupId)
        .catch(function(err) {
            console.error(err)
            res.status(404).send(err)
        })
        .then(function(group) {
            return group
                .findUsers()
        })
        .then(function(users) {
            res.status(200).send(users)
        })
}

/*
  Method DELETE on route ‘api/groups/{groupId}’ - deletes a group.
*/
exports.deleteGroup = function(req, res) {
  let groupId = req.params.groupId

  Group
    .destroy({where:{id: groupId}})
    .catch(function(err) {
      console.error(err)
      res.status(400).send(err)
    })
    .then(function() {
      res.status(200).json({message:'Group deleted succesfuly'})
    })
}

/*
  Method PUT on route ‘api/groups/{groupId}/add/’ - adds a member into the group. It will receive a memberId as a parameter, and it will add that memberId to the memberIds array.
*/
exports.putGroupMember = function(req, res) {
  let groupId = req.params.groupId
  let userId = req.params.userId

  Group
    .findById(groupId)
    .catch(function(err) {
      console.error(err)
      res.status(404).send(err)
    })
    .then(function(group) {
      return group
        .addUser(userId)
    })
    .catch(function(err) {
      console.error(err)
      res.status(400).send(err)
    })
    .then(function() {
      res.status(201).json({message: 'OK'})
    })
}

/*
  Method DELETE on route ‘api/groups/{groupId}/remove’ - removes a member from that group.
*/
exports.deleteGroupMember = function(req, res) {
  let groupId = req.params.groupId
  let userId = req.params.userId

  Group
    .findById(groupId)
    .catch(function(err) {
      console.error(err)
      res.status(404).send(err)
    })
    .then(function(group) {
      return group
        .deleteUser(userId)
    })
    .catch(function(err) {
      console.error(err)
      res.status(400).send(err)
    })
    .then(function() {
      res.status(201).json({message: 'OK'})
    })
}