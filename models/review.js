var mongoose = require('mongoose');
var moment = require('moment');

var Schema = mongoose.Schema;

var ReviewSchema = Schema(
  {
    author: {type: String},
    rating: {type: Number, min: 1, max: 5},
    feedback: {type: String, required: true},
    date: {type: String}
  }
);

ReviewSchema
.virtual('date_formatted')
.get(function() {
    return moment(this.date).format('MMMM Do, YYYY');
});

//Export model
module.exports = mongoose.model('Review', ReviewSchema);