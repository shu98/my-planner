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

CitySchema
.virtual('name_formatted')
.get(function () {
	var city = this.name;
	var city_list = city.split(" ");

	for (i = 0; i < city_list.length; i++) {
		city_list[i] = city_list[i].substring(0,1).toUpperCase() + city_list[i].substring(1);
	}
	return city_list.join(" ");
});

//Export model
module.exports = mongoose.model('City', CitySchema);