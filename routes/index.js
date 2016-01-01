/**
* @author Asa Carrington
* provides routes for index features
* @module router
*/

var express = require('express');
var storySchema = require('../schemas/story-schema').Story;
var storyService = require('../services/story-service');
var auditService = require('../services/audit-service');

var router = express.Router({
  mergeParams: true
});

router.use(function (req, res, next) {
  next();
});
/**
 * Represents an endpoint to load index page and generate a story.
 * @param {object} req - The request object
 * @param {object} res - The response object
 */
 router.get('/', function(req, res, next) {
    storyService.generate(function(data){
          res.render('index', {stories: data, title: 'Story'});
    });
 });
/** export router*/
module.exports = router;
