/**
 * @author Asa Carrington
 * Establishes mongoose connection properties.
 */
var uri = 'mongodb://localhost:27017/fluffy-adventure-db';
var mongoose = require('mongoose');
mongoose.connect(uri);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(callback) {
  console.log('db connected');
});
