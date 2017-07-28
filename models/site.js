var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var SiteSchema = Schema(
  {
    name: {type: String},
    rating: {type: Number, min: 1, max: 5},
    time: {type: String},
    time_spent: {type: Number, min: 0},
    comments: {type: String}
  }
);

//Export model
module.exports = mongoose.model('Site', SiteSchema);