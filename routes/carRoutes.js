const express = require('express');
const { listCar, getAllCars, getCarById, bookCar} = require('../controllers/carController');
const { addToFavorite} = require('../controllers/favCarController');
const router = express.Router();
const isLoggedIn = require('../middleware/isLoggedIn');

router.get('/listcar', (req, res) =>{
    res.render('list-car')
})

router.post('/listcar', isLoggedIn, listCar)
router.get('/bookcar', isLoggedIn, getAllCars);
router.get('/getcar/:id', isLoggedIn, getCarById)
router.get('/bookcar/:id', isLoggedIn, bookCar)








module.exports = router
