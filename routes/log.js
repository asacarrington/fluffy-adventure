/**
* @author Asa Carrington
* provides routes for log features
* @module router
*/

var express = require('express');
var auditService = require('../services/audit-service');
var router = express.Router({
  mergeParams: true
});

router.use(function (req, res, next) {
  next();
});

/**
 * Represents an endpoint to log audit information
 * @param {object} req - The request object
 * @param {object} res - The response object
 */
router.post('/', function(req, res, next) {
  auditService.log(req, 'network');
  res.end();
});
/** export router*/
module.exports = router;
