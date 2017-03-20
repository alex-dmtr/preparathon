var Sequelize = require('sequelize')
var Promise = require('bluebird')

var sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'postgres',

    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },

    logging: false
})

var User = require('./user')(sequelize)
var Group = require('./group')(sequelize)
var Post = require('./post')(sequelize)

Group.belongsTo(User, {as: 'owner'})

Group.belongsToMany(User, {through: 'user_group'})
User.belongsToMany(Group, {through: 'user_group'})

Post.belongsTo(User, {as: 'owner'})
Post.belongsTo(Group, {as: 'group'})

sequelize.seed = function() {
    let tasks = []
    let users = []
    let groups = []
    tasks.push(
      User.bulkCreate([
        { username: process.env.ROOT_USERNAME, password: process.env.ROOT_PASSWORD, email: 'root@root.com'},
        { username: 'user2', password: 'shh', email: 'user2@user.com'},
        { username: 'user3', password: 'shh', email: 'user3@user.com'},
        { username: 'user4', password: 'shh', email: 'user4@user.com'},
        { username: 'user5', password: 'shh', email: 'user5@user.com'},
        { username: 'user6', password: 'shh', email: 'user6@user.com'},
        { username: 'user7', password: 'shh', email: 'user7@user.com'},
        ]).then(function() { return User.findAll()}).then(function(users) {this.users = users; })

        )

    tasks.push(
      Group.bulkCreate([
        { name: 'group1', description: 'group1', avatarUrl: 'group1'},
        { name: 'group2', description: 'group2', avatarUrl: 'group2'},
        { name: 'group3', description: 'group3', avatarUrl: 'group3'},
        { name: 'group4', description: 'group4', avatarUrl: 'group4'},
      ]).then(function() {
        return Group.findAll()
      }).then(function(groups) {
        this.groups = groups
        var groupTask = groups.map(function(group) {
          return new Promise(function(resolve, reject) {
            group.addUser(this.users[1]).then(resolve).catch(reject)
          })
        })
        return Promise.all(groupTask)
      }))

    tasks.push(
      Post.bulkCreate([
        { message: 'Hello World!', ownerId: 2, groupId: 1},
        { message: 'Oh Danny boy', ownerId: 2, groupId: 2},
        { message: 'The pipes, the pipes', ownerId: 2, groupId: 2},
        { message: 'Are calling', ownerId: 2, groupId: 1},
        { message: 'The quick brown fox', ownerId: 2, groupId: 3},
        { message: 'jumps over the lazy dog.', ownerId: 2, groupId: 3},
      ])
    )

    return Promise.all(tasks)
}

module.exports = sequelize
