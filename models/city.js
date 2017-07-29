var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CitySchema = Schema(
  {
    name: {type: String}
  }
);

CitySchema
.virtual('url')
.get(function () {
  return '/database/cities/' + this._id;
});

//Export model
module.exports = mongoose.model('City', CitySchema);