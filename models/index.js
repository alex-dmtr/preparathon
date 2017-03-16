var Sequelize = require('sequelize')


var sequelize = new Sequelize('roadmap', 'postgres', 'password', {
    host: 'localhost',
    dialect: 'postgres',

    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
})

var User = sequelize.define('user', {
    id: {
        type: Sequelize.UUID,
        primaryKey: true
    },
    username: Sequelize.STRING,
    email: Sequelize.STRING,
    description: Sequelize.STRING,
    password: Sequelize.STRING,
    avatarUrl: Sequelize.STRING,
    age: Sequelize.INTEGER,
    currentProject: Sequelize.STRING,
    agency: Sequelize.STRING
})

module.exports = sequelize