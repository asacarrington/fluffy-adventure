/**
* @author Asa Carrington
* A module that says creates a mongoose schema representing a audit object
* @module auditSchema
*/
var db = require('../config/database');
var mongoose = require('mongoose');

var auditSchema = mongoose.Schema({
  userRef: String,
  objRef: String,
  interaction: String,
  timestamp: { type: Date, default: Date.now }
});

auditSchema.virtual('username').get(function () {
    return "Asa Carrington";
});

auditSchema.virtual('username').set(function (value) {
  this.userRef = "Asa Carrington";
});

/** export auditSchema */
exports.Audit = mongoose.model('Audit', auditSchema);
