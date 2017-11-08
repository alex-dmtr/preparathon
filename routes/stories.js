var slugify = require('slugify')
var models = require('../models').models
var Story = models.story

exports.getStories = async (req, res) => {
  const stories = await Story.findAll()

  res.json(stories)
}
