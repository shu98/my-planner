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

router.post('/itineraries', itinerary_controller.itinerary_list_sort);

router.get('/itineraries/:id', itinerary_controller.itinerary_detail);

router.post('/itineraries/:id', itinerary_controller.itinerary_detail_comment);

router.get('/cities', itinerary_controller.city_list);

router.post('/cities', itinerary_controller.city_list_search);

router.get('/cities/:id', itinerary_controller.city_detail);

router.post('/cities/:id', itinerary_controller.city_detail_sort);

router.get('/find', itinerary_controller.find_get);

router.post('/find', itinerary_controller.find_post);

router.get('/results', itinerary_controller.search_results);

module.exports = router;
