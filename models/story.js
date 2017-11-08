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
      unique: true,
      allowNull: false
    },
    content: {
      type: Sequelize.TEXT,
      unique: true,
      allowNull: false
    },
  }, {
      timestamps: false
    })
  return Story
}