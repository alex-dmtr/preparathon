var models = require('../models').models
var User = models.user
var Group = models.group
var Post = models.post
// add endpoint for GET on /api/groups/{userId}
/*

nu ar fi mai bine ca asta sa fie in '/api/users/{userId}/groups'?
    Method GET on route ‘api/groups/{userId}’ - gets all the groups that a user is currently in.
*/

exports.getUserGroups = function(req, res) {
    let userId = req.params.userId

    // User  
    //     .findById(userId)
    //     .then(function(user) {
    //       if (user == null)
    //         throw Error("user not found")
    //       return user.getGroups(
    //         {
    //           attributes: ['id', 'name', 'description'],
    //           through: { attributes: []}
    //       })
    //     })
    //     .then(function(groups) {
    //         res.status(200).json(groups)
    //     })
    User
      .findById(userId, {
        attributes: [],
        include: [
          {
            model: Group,
            attributes: [ 'id', 'name', 'description'],
            through: {
              attributes: []
            }
          }
        ]
      })
      .then(function(user) {
        res.status(200).json(user.groups)
      })
        .catch(function(err) {
            // console.error(err)
            res.status(404).send()
        })
}

/*
    Method POST on route ‘api/groups’ - creates a new group, initially a group with all the fields set, except the memberIds, that at the beginning is an empty array
*/
exports.postGroups = function(req, res) {
    let newGroup = req.body

    newGroup.ownerId = req.user.id
    Group
        .create(newGroup)
        .then(function(group) {
            res.status(201).json(group)
        })
        .catch(function(err) {
            console.error(err)
            res.status(400).send(err)
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

    let group = null
    Group
        .findById(groupId)
        .then(function(group) {
            this.group = group
       
            return Post.findAll({where: {groupId:groupId}})
         })
        .then(function(posts) {
            let group = this.group
            res.status(200).send({
                id: group.id,
                name: group.name,
                description: group.description,
                avatarUrl: group.avatarUrl,
                ownerId: group.ownerId,
                posts: posts
            })            
        })
        .catch(function(err) {
            console.error(err)
            res.status(404).send(err)
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
                .getUsers()
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
    .then(function(group) {
      return group
        .removeUser(userId)
    })
    .then(function() {
      res.status(200).json({message: 'OK'})
    })
.catch(function(err) {
      console.error(err)
      res.status(400).send(err)
    })
}