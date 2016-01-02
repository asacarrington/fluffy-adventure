/**
 * @author Asa Carrington
 * A module that says creates a mongoose schema representing a story object
 * @module storySchema
 */
var _ = require('lodash');
var db = require('../config/database');
var mongoose = require('mongoose');

var storySchema = mongoose.Schema({
  type: Number,
  content: String
});
/** export storySchema*/
exports.Story = mongoose.model('stories', storySchema);
