const Sequelize = require('sequelize')

module.exports = function(sequelize) {
    var Group = sequelize.define('group', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING(500),
            allowNull: false
        },
        // ownerId: {
        //     type: Sequelize.INTEGER
        // },
        description: {
            type: Sequelize.STRING(500),
            allowNull: false
        },
        avatarUrl: {
            type: Sequelize.STRING,
            allowNull: false
        },
        // memberIds: {
        //     type: Sequelize.ARRAY(Sequelize.INTEGER)
        // }
    })
    return Group
}
