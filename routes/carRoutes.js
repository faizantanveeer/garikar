const express = require('express');
const { listCar, getAllCars, addToFavorite} = require('../controllers/carController');
const router = express.Router();
const isLoggedIn = require('../middleware/isLoggedIn');

router.get('/listcar', (req, res) =>{
    res.render('list-car')
})

router.post('/listcar', isLoggedIn, listCar)
router.get('/bookcar', isLoggedIn, getAllCars);
router.post('/addfav', isLoggedIn, addToFavorite)
module.exports = router
