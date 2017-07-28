var express = require('express');
var router = express.Router();

var itinerary_controller = require('../controllers/itineraryController');

router.get('/itineraries/new', itinerary_controller.itinerary_add_get);

router.post('/itineraries/new', itinerary_controller.itinerary_add_post);

router.get('/itineraries/:id/update', itinerary_controller.itinerary_update_get);

router.post('/itineraries/:id/update', itinerary_controller.itinerary_update_post);

router.get('/itineraries/:id/delete', itinerary_controller.itinerary_delete_get);

router.post('/itineraries/:id/delete', itinerary_controller.itinerary_delete_post);

router.get('/itineraries', itinerary_controller.itinerary_list);

router.get('/itineraries/:id', itinerary_controller.itinerary_detail);

router.post('/itineraries/:id', itinerary_controller.itinerary_detail_comment);

module.exports = router;
