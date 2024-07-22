const express = require('express');
const { listCar, getAllCars } = require('../controllers/carController');
const router = express.Router();
const isLoggedIn = require('../middleware/isLoggedIn');

router.get('/listcar', (req, res) =>{
    res.render('list-car')
})

router.post('/listcar', isLoggedIn, listCar)
router.get('/bookcar', isLoggedIn, getAllCars);
module.exports = router
