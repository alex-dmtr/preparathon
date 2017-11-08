const Sequelize = require('sequelize')
var Promise = require('bluebird')

module.exports = function (sequelize) {
  var Story = sequelize.define('story', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: Sequelize.STRING(256),
      allowNull: false
    },
    content: {
      type: Sequelize.TEXT(),
      allowNull: false
    },
  }, {
      timestamps: false
    })
  return Story
}