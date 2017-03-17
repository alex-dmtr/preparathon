const Sequelize = require('sequelize')


module.exports = function(sequelize) {
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

    return User
}