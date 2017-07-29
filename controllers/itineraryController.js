var Itinerary = require('../models/itinerary');
var Lodging = require('../models/lodging');
var Site = require('../models/site');
var City = require('../models/city');
var Review = require('../models/review');
var async = require('async');

exports.index = function(req, res, next) {
    res.render('index', {title: 'Trip Planner'});
};

exports.index_post = function(req, res) {
    req.checkBody('destination', 'Please enter a destination city').notEmpty();
    req.sanitize('destination').escape();
    req.sanitize('destination').trim();

    City.findOne({'name': req.body.destination})
        .exec(function(err, found_city) {
            if(err) {return next(err);}
            if(found_city) {
                res.redirect(found_city.url);
            }
        })

};

exports.itinerary_list = function(req, res, next) {
    
    Itinerary.find({}, 'destination from budget')
        .populate('destination')
        .exec(function(err, list_itineraries) {
            if(err) {return next(err);}
            res.render('itinerary_list', {title: 'Itineraries', itinerary_list: list_itineraries});
        });
};

exports.itinerary_detail = function(req, res, next) {

    Itinerary.findById(req.params.id)
        .populate('destination')
        .populate('lodging')
        .populate('sites')
        .populate('reviews')
        .exec(function(err, result) {
            if(err) {return next(err);}
            res.render('itinerary_detail', {title: 'Itinerary', itinerary: result});
        });

};

exports.city_list = function(req, res, next) {
    City.find({})
        .sort([['name', 'ascending']])
        .exec(function(err, list_cities) {
            if(err) {return next(err);}
            res.render('city_list', {title: 'Cities', city_list: list_cities});
        });
    
};

exports.city_detail = function(req, res, next) {
    async.parallel({
        city: function(callback) {
            City.findById(req.params.id)
                .exec(callback);
        },

        city_itineraries: function(callback) {
            Itinerary.find({'destination': req.params.id}, 'destination from budget')
                .populate('destination')
                .exec(callback);
        }
    }, function(err, results) {
        if(err) {return next(err);}
        res.render('city_detail', {city: results.city, city_itineraries: results.city_itineraries});
    });

};


exports.itinerary_detail_comment = function(req, res, next) {

    req.checkBody('author', 'Name is required').notEmpty();
    req.checkBody('rating').optional({checkFalsy: true});
    req.checkBody('feedback', 'Please provide some feedback').notEmpty();

    req.sanitize('author').escape();
    req.sanitize('author').trim();
    req.sanitize('rating').escape();
    req.sanitize('rating').trim();
    req.sanitize('feedback').escape();
    req.sanitize('feedback').trim();

    var review = new Review({
        author: req.body.author,
        rating: req.body.rating,
        feedback: req.body.feedback,
        date: new Date().toISOString()
    });

    review.save();

    Itinerary.findById(req.params.id)
        .populate('destination')
        .populate('lodging')
        .populate('sites')
        .populate('reviews')
        .exec(function(err, result) {
            if(err) {return next(err);}
            result.reviews.push(review);
            result.save(function(err, next) {
                if(err) {return next(err);}
                res.redirect(result.url);
            });
        });

};

exports.itinerary_add_get = function(req, res) {
    res.render('itinerary_form', { title: 'Add itinerary' });
};

exports.itinerary_add_post = function(req, res) {

    req.checkBody('destination', 'Destination is required.').notEmpty();
    req.checkBody('from', 'Invalid origin city').optional({checkFalsy: true}).isAlpha();
    req.checkBody('by').optional({checkFalsy: true});
    req.checkBody('budget').optional({checkFalsy: true});
    req.checkBody('age_group').optional({checkFalsy: true});
    req.checkBody('arrived').optional({checkFalsy: true}).isDate();
    req.checkBody('time_arrive').optional({checkFalsy: true});
    req.checkBody('depart').optional({checkFalsy: true}).isDate();
    req.checkBody('time_depart').optional({checkFalsy: true});
    req.checkBody('age_group').optional({checkFalsy: true});
    req.checkBody('lodging_type').optional({checkFalsy: true});
    req.checkBody('lodging_name').optional({checkFalsy: true});
    req.checkBody('lodging_price').optional({checkFalsy: true});
    req.checkBody('lodging_rating').optional({checkFalsy: true});
    req.checkBody('lodging_comments').optional({checkFalsy: true});
    req.checkBody('site_name').optional({checkFalsy: true});
    req.checkBody('site_rating').optional({checkFalsy: true});
    req.checkBody('site_time').optional({checkFalsy: true});
    req.checkBody('site_time_spent').optional({checkFalsy: true});
    req.checkBody('site_comments').optional({checkFalsy: true});

    req.sanitize('destination').escape();
    req.sanitize('destination').trim();
    req.sanitize('from').escape();
    req.sanitize('from').trim();
    req.sanitize('budget').escape();
    req.sanitize('budget').trim();
    req.sanitize('age_group').escape();
    req.sanitize('age_group').trim();
    req.sanitize('arrived').toDate();
    req.sanitize('time_arrive').escape();
    req.sanitize('time_arrive').trim();
    req.sanitize('depart').toDate();
    req.sanitize('time_depart').escape();
    req.sanitize('time_depart').trim();
    req.sanitize('lodging_type').escape();
    req.sanitize('lodging_type').trim();
    req.sanitize('lodging_name').escape();
    req.sanitize('lodging_name').trim();
    req.sanitize('lodging_price').escape();
    req.sanitize('lodging_price').trim();
    req.sanitize('lodging_rating').escape();
    req.sanitize('lodging_rating').trim();
    req.sanitize('lodging_comments').escape();
    req.sanitize('lodging_comments').trim();
    req.sanitize('site_name').escape();
    req.sanitize('site_name').trim();
    req.sanitize('site_rating').escape();
    req.sanitize('site_rating').trim();
    req.sanitize('site_time').escape();
    req.sanitize('site_time').trim();
    req.sanitize('site_time_spent').escape();
    req.sanitize('site_time_spent').trim();
    req.sanitize('site_comments').escape();
    req.sanitize('site_comments').trim();

    var lodge = new Lodging({
        type: req.body.lodging_type,
        name: req.body.lodging_name,
        price: req.body.lodging_price,
        rating: req.body.lodging_rating,
        comments: req.body.lodging_comments
    });

    lodge.save();

    site_name = req.body.site_name.split(",");
    site_name.splice(1, 1);
    site_rating = req.body.site_rating.split(",");
    site_time = req.body.site_time.split(",");
    site_time.splice(1, 1);
    site_time_spent = req.body.site_time_spent.split(",");
    site_time_spent.splice(1, 1);
    site_comments = req.body.site_comments.split(",");
    site_comments.splice(1, 1);

    var sites = [];
    for (i = 0; i < site_name.length; i++) {
        var site = new Site({
            name: site_name[i],
            rating: site_rating[i],
            time: site_time[i],
            time_spent: site_time_spent[i],
            comments: site_comments[i]
        });

        sites.push(site);
        site.save();
    }

    City.findOne({'name': req.body.destination})
        .exec(function(err, found_city) {
            if (err) {return next(err);}

            if (found_city) {
                var itinerary = new Itinerary({
                    destination: found_city,
                    from: req.body.from,
                    by: req.body.by,
                    budget: req.body.budget,
                    age_group: (typeof req.body.age_group==='undefined') ? [] : req.body.age_group.split(","),
                    arrived: req.body.arrived,
                    time_arrive: req.body.time_arrive,
                    depart: req.body.depart,
                    time_depart: req.body.time_depart,
                    lodging: lodge,
                    sites: sites,

                });

                itinerary.save(function(err, next) {
                    if(err) {return next(err);}
                    res.redirect(itinerary.url);
                });

                console.log(itinerary);
            }

            else {
                var city = new City({name: req.body.destination});
                city.save();
                var itinerary = new Itinerary({
                    destination: found_city,
                    from: req.body.from,
                    by: req.body.by,
                    budget: req.body.budget,
                    age_group: (typeof req.body.age_group==='undefined') ? [] : req.body.age_group.split(","),
                    arrived: req.body.arrived,
                    time_arrive: req.body.time_arrive,
                    depart: req.body.depart,
                    time_depart: req.body.time_depart,
                    lodging: lodge,
                    sites: sites,
                });

                itinerary.save(function(err, next) {
                    if(err) {return next(err);}
                    res.redirect(itinerary.url);
                });

            }
        });
};

exports.browse_by_get = function(req, res) {
    res.render('browse', {title: 'Browse Itineraries'});
};

exports.browse_by_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Browse Page');
};

exports.refined_search = function(req, res) {
	res.send('NOT IMPLEMENTED: Refined search page')
};

exports.results_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Results page GET');
};

exports.itinerary_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Update itinerary GET');
};

exports.itinerary_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Delete itinerary POST');
};

exports.itinerary_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Delete itinerary GET');
};

exports.itinerary_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Delete itinerary POST');
};



