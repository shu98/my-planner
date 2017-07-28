#! /usr/bin/env node

console.log('This script populates a some test sites and their cities into the database');

//Get arguments passed on command line
var userArgs = process.argv.slice(2);
if (!userArgs[0].startsWith('mongodb://')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}

var async = require('async')
var Lodging = require('./models/lodging')
var Site = require('./models/site')
var Itinerary = require('./models/itinerary')


var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB);
var db = mongoose.connection;
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

var itineraries = [];
var sites = [];
var lodging = [];

function lodgingCreate(type, name, price, rating, comments, cb) {
  lodgingdetail = {
    type: type, 
    name: name,
    price: price,
    rating: rating,
    comments: comments
  };
  
  var lodge = new Lodging(lodgingdetail);
       
  lodge.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Lodging: ' + lodging);
    lodging.push(lodge)
    cb(null, lodge)
  }  );
}

function siteCreate(name, rating, time, time_spent, comments, cb) {
  sitedetail = {
    name: name, 
    rating: rating,
    time: time,
    time_spent: time_spent,
    comments: comments
  };
  
  var site = new Site(sitedetail);
       
  site.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Site: ' + site);
    sites.push(site)
    cb(null, site)
  }  );
}

function itineraryCreate(dest, from, by, budget, age, arrived, time_arrived, depart, time_depart, lodge, sites_list, reviews, cb) {
  itinerarydetail = { 
    destination: dest, 
    from: from,
    by: by,
    budget: budget, 
    age_group: age,
    arrived: arrived,
    time_arrived: time_arrived, 
    depart: depart,
    time_depart: time_depart,
    lodging: lodge, 
    sites: sites_list,
    reviews: reviews
  };

  var itinerary = new Itinerary(itinerarydetail);
       
  itinerary.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New Itinerary: ' + itinerary);
    itineraries.push(itinerary)
    cb(null, itinerary);
  }   );
}


function createLodging(cb) {
    async.series([
        function(callback) {
          lodgingCreate('Hotel', 'Crowne Plaza', 213, 4, "Very nice environment and facilities!", callback);
        },
        function(callback) {
          lodgingCreate('Airbnb', 'Desert Oasis', 37, 5, "Beautiful apartment, good location.", callback);
        },
        function(callback) {
          lodgingCreate('Hostel', 'Abraham Hostel', 56, 4, "Nice cheap place for young travelers", callback);
        }
        ],
        // optional callback
        cb);
}


function createSite(cb) {
    async.series([
        function(callback) {
          siteCreate('HaYarkon Park', 5, 'Morning', 2, 'Nice and calm', callback)
        },
        function(callback) {
          siteCreate('Sarona Market', 5, 'Afternoon', 1, 'Amazing!!!', callback)
        },
        function(callback) {
          siteCreate('Rosh Hanikra', 4, 'Morning', 2, 'Grottos are beautiful', callback)
        },
        function(callback) {
          siteCreate('Old City of Akko', 4, 'Afternoon', 3, 'Wonderfully historic city!', callback)
        },
        function(callback) {
          siteCreate('Temple Mount', 4, 'Morning', 2, 'Wow!', callback)
        },
        function(callback) {
          siteCreate('Mount of Olives', 4, 'Afternoon', 4, 'Beautiful views', callback)
        },
        function(callback) {
          siteCreate('Wailing Wall', 4, 'Evening', 2, 'Prayer scene was breathtaking', callback)
        },
        function(callback) {
          siteCreate('City of David', 5, 'Morning', 2, 'Had a good time', callback)
        },
        function(callback) {
          siteCreate('Church of the Holy Sepulchre', 4, 'Afternoon', 1, 'Interesting place', callback)
        }

        ],
        // optional callback
        cb);
}

function createItinerary(cb) {
    async.series([
        function(callback) {
          itineraryCreate('Tel Aviv', 'San Diego', 'Airplane', 500, 'Everyone', '2017-05-31', 'Night', '2017-06-04', 'Morning', lodging[0], [sites[0], sites[1]], [], callback);
        },
        function(callback) {
          itineraryCreate('Haifa', 'Beer Sheva', 'Train', 200, 'Young Adults', '2017-07-20', 'Evening', '2017-07-22', 'Evening', lodging[1], [sites[2], sites[3]],[],callback);
        },
        function(callback) {
          itineraryCreate('Jerusalem', 'Tel Aviv', 'Train', 200, 'Families', '2017-07-27', 'Evening', '2017-07-30', 'Morning', lodging[2], [sites[4], sites[5], sites[6], sites[7], sites[8]], [], callback);
        }
        ],
        // optional callback
        cb);
}


async.series([
    createSite,
    createLodging,
    createItinerary
],
// optional callback
function(err, results) {
    if (err) {
        console.log('FINAL ERR: '+ err);
    }
    else {
        console.log('Itineraries: '+ itineraries);
        
    }
    //All done, disconnect from database
    mongoose.connection.close();
});


