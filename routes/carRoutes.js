const express = require('express');
const { listCar, getAllCars, getCarById, bookCar,searchCar} = require('../controllers/carController');
const { addToFavorite} = require('../controllers/favCarController');
const router = express.Router();
const isLoggedIn = require('../middleware/isLoggedIn');
const upload = require('../config/multer')

router.get('/listcar', (req, res) =>{
    res.render('list-car')
})

router.post('/listcar', isLoggedIn, upload.single('image'), listCar)
router.get('/bookcar', isLoggedIn, getAllCars);
router.get('/search', isLoggedIn, searchCar);

router.get('/getcar/:id', isLoggedIn, getCarById)
router.get('/bookcar/:id', isLoggedIn, bookCar)








module.exports = router
