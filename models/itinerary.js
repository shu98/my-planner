var mongoose = require('mongoose');
var moment = require('moment');

var Schema = mongoose.Schema;

var ItinerarySchema = Schema(
  {
    destination: {type: Schema.ObjectId, ref: 'City', required: true},
    from: {type: String},
    by: {type: String},
    budget: {type: Number, min: 0, max: 1000000000},
    age_group: {type: String},
    arrived: {type: Date},
    time_arrive: {type: String},
    depart: {type: Date},
    time_depart: {type: String},
    logistics: {type: String},
    lodging: {type: Schema.ObjectId, ref: 'Lodging'},
    sites: [{type: Schema.ObjectId, ref: 'Site'}],
    reviews: [{type: Schema.ObjectId, ref: 'Review'}],
    date_added: {type: Date}
  }
);

ItinerarySchema
.virtual('url')
.get(function () {
  return '/database/itineraries/' + this._id;
});

ItinerarySchema
.virtual('arrived_formatted')
.get(function() {
    return this.arrived ? moment(this.arrived).format('MMMM Do, YYYY') : '';
});


ItinerarySchema
.virtual('depart_formatted')
.get(function() {
    return this.depart ? moment(this.depart).format('MMMM Do, YYYY') : '';
});

ItinerarySchema
.virtual('date_added_formatted')
.get(function() {
    return this.date_added ? moment(this.date_added).format('MM/DD/YYYY') : '';
});

//Export model
module.exports = mongoose.model('Itinerary', ItinerarySchema);