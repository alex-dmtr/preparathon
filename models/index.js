var Sequelize = require('sequelize')
var Promise = require('bluebird')

var sequelize = new Sequelize('roadmap', process.env.DB_USERNAME, process.env.DB_PASSWORD, {
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

Group.belongsTo(User, {as: 'owner'})

Group.belongsToMany(User, {through: 'user_group'})
User.belongsToMany(Group, {through: 'user_group'})

sequelize.seed = function() {
    return new Promise(function(resolve, reject) {
        User.create({
            username: process.env.ROOT_USERNAME, 
            password: process.env.ROOT_PASSWORD,
            email: 'root@root.com'})
            .catch(reject)
            .then(resolve)
    })
}

module.exports = sequelize