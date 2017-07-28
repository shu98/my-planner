var express = require('express');
var router = express.Router();

// Require controller modules
var itinerary_controller = require('../controllers/itineraryController');

router.get('/', itinerary_controller.index);

module.exports = router;

