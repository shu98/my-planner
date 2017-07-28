var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var LodgingSchema = Schema(
  {
    type: {type: String},
    name: {type: String},
    price: {type: Number, min: 0, max: 1000000000},
    rating: {type: Number, min: 1, max: 5},
    comments: {type: String}
  }
);

//Export model
module.exports = mongoose.model('Lodging', LodgingSchema);