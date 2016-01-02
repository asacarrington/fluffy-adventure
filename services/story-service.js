/**
 * @author Asa Carrington
 * A module that provides crud operations for story data
 * @module storyService
 */
var express = require('express');
var storySchema = require('../schemas/story-schema').Story;
var mongoId = require('mongoose').Types.ObjectId;

var storyService = {
    /**
     * inserts or updates story information to the database.
     * @function upsert
     * @param {object} obj - The object containing story information.
     * @param {requestCallback} callback -  The callback that handles the response.
     */
    upsert: function(obj, callback) {
      var id = new mongoId();
      if (obj.id !== null && obj.id !== undefined && obj.id !== "") {
        id = new mongoId(obj.id);
      }
      storySchema.findOneAndUpdate({
        _id: id
      }, {
        content: obj.content,
        type: obj.type
      }, {
        new: true,
        upsert: true
      }, function(error, doc) {
        callback();
        /**
         * @callback requestCallback
         */
      });
    },
    /**
     * deletes story information to the database.
     * @function delete
     * @param {number} id - ID of the story to be deleted.
     */
    delete: function(id) {
      storySchema.remove({
        _id: id
      }, function(err) {
        if (err) console.error(err);
        return true;
      });
    },
    /**
     * returns all stories from the database.
     * @function getAll
     * @param {requestCallback} callback -  The callback that handles the response.
     */
    getAll: function(callback) {
      storySchema.find(function(err, storiesCollection) {
        if (err) console.error(err);
        callback(storiesCollection);
        /**
         * @callback requestCallback
         * @param {array} storiesCollection  - story entities from database
         */
      });
    },
    /**
     * returns one story from the database.
     * @function getOne
     * @param {number} id - ID of the story to be returned.
     * @param {requestCallback} callback -  The callback that handles the response.
     */
    getOne: function(id, callback) {
      storySchema.findOne({
        _id: id
      }, function(err, story) {
        if (err) console.error(err);
        callback(story);
        /**
         * @callback requestCallback
         * @param {object} story - story entity from database
         */
      });
    },
    /**
     * generates a story by combining different story segments at random.
     * @function generate
     * @param {requestCallback} callback -  The callback that handles the response.
     */
    generate: function(callback) {

      var condition = function(elm, type) {
          if (elm.type == type) {
            return true;
          }
        }
        /**
         * Generates a random number within the rage passed in by limit
         * @function random
         * @param {limit} number -  The length to limit by.
         */
      var random = function(limit) {
        return Math.round(Math.random() * (limit - 1));
      }

      storySchema.find(function(err, storiesCollection) {
        /**
         * @property {object}  begining       - The begining segment of the story.
         * @property {object}  middle         - The middle segment of the story.
         * @property {object}  end            - The end segment of the story.
         */
        var storyData = {
          begining: storiesCollection.filter(function(obj) {
            return condition(obj, 1);
          }),
          middle: storiesCollection.filter(function(obj) {
            return condition(obj, 2);
          }),
          end: storiesCollection.filter(function(obj) {
            return condition(obj, 3);
          })
        }
        storyData.begining = storyData.begining[random(storyData.begining.length)];
        storyData.middle = storyData.middle[random(storyData.middle.length)];
        storyData.end = storyData.end[random(storyData.end.length)];
        callback(storyData);
        /**
         * This callback sends data back to the router.
         * @callback requestCallback
         * @param {object} story - complete generated story object
         */
      });
    }
  }
  /** export storyService*/
module.exports = storyService;
