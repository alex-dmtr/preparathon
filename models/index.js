var Sequelize = require('sequelize')

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

var User = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: Sequelize.STRING(256),
        unique: true,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING(256),
        allowNull: false
    },
    description: Sequelize.STRING(500),
    password: {
        type: Sequelize.STRING(256),
        allowNull: false
    },
    avatarUrl: Sequelize.STRING(500),
    age: Sequelize.INTEGER,
    currentProject: Sequelize.STRING(500),
    agency: Sequelize.STRING(500)
})

module.exports = sequelize