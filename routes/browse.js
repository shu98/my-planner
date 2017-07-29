var express = require('express');
var router = express.Router();

var itinerary_controller = require('../controllers/itineraryController');

router.get('/', itinerary_controller.index);

router.post('/', itinerary_controller.browse_by_post);

router.get('/refined-search', itinerary_controller.refined_search);

router.get('/results/:destination', itinerary_controller.results_get);

module.exports = router;