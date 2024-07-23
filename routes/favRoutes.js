const express = require('express');
const { addToFavorite, getAllFavCars} = require('../controllers/favCarController');
const router = express.Router();
const isLoggedIn = require('../middleware/isLoggedIn');


router.post('/addfav', isLoggedIn, addToFavorite);
router.get('/getfavcar', isLoggedIn, getAllFavCars);
module.exports = router
