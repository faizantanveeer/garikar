const express = require('express');
const router = express.Router();
const authRoutes = require('./authRoutes');
const carRoutes = require('./carRoutes');
const favRoutes = require('./favRoutes')

router.use('/', authRoutes)
router.use('/auth', authRoutes);
router.use('/car', carRoutes);
router.use('/fav', favRoutes)

module.exports = router;