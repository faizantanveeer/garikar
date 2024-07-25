const express = require('express');
const { listCar, getAllCars, getCarById} = require('../controllers/carController');
const { addToFavorite} = require('../controllers/favCarController');
const router = express.Router();
const isLoggedIn = require('../middleware/isLoggedIn');

router.get('/listcar', (req, res) =>{
    res.render('list-car')
})

router.post('/listcar', isLoggedIn, listCar)
router.get('/bookcar', isLoggedIn, getAllCars);

router.get('/bookcar/:id', isLoggedIn, getCarById)






module.exports = router
