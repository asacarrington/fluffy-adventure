var _ = require('lodash');
var db = require('../config/database');
var mongoose = require('mongoose');

var storySchema = mongoose.Schema({
  type: Number,
  content: String
});

exports.Story = mongoose.model('stories', storySchema);
