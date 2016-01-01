/**
* @author Asa Carrington
* provides routes for story features
* @module router
*/

var express = require('express');
var mongoId = require('mongoose').Types.ObjectId;
var storySchema = require('../schemas/story-schema').Story;
var storyService = require('../services/story-service');
var auditService = require('../services/audit-service');

var router = express.Router({
  mergeParams: true
});

/**
 * Represents an endpoint first called by /story routes to log an audit trail
 * @param {object} req - The request object
 * @param {object} res - The response object
 */
router.use(function (req, res, next) {
  auditService.log('loaded', 'hit');
  next();
});

/**
 * Represents an endpoint that returns a list of all stories
 * @param {object} req - The request object
 * @param {object} res - The response object
 */
router.get('/', function(req, res, next) {
  storyService.getAll(function(data){
    res.render('list', {stories: data, title: 'sdsdadsa'});
  });
});

/**
 * Represents an endpoint takes a story object to either update or insert
 * @param {object} req - The request object
 * @param {object} res - The response object
 */
router.post('/', function(req, res, next) {
   storyService.upsert(
     {id:req.body.id, content: req.body.content, type:req.body.type}, function(){
       res.end();
     }
   );
});

/**
 * Represents an endpoint that deletes a story
 * @param {object} req - The request object
 * @param {object} res - The response object
 */
router.delete('/:id', function (req, res) {
  storyService.delete(req.params.id);
  res.end();
});

/**
 * Represents an endpoint that returns one story to be edited
 * @param {object} req - The request object
 * @param {object} res - The response object
 */
router.get('/:id', function (req, res) {
  storyService.getOne(req.params.id, function(data){
      res.json(data);
  })
});
/** export router*/
module.exports = router;
