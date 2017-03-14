var Sequelize = require('sequelize')


var sequelize = new Sequelize('group', 'postgres', 'password', {
    host: 'localhost',
    dialect: 'postgres',

    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
})

module.exports = sequelize