const express = require('express');
const router = express.Router();
const authRoutes = require('./authRoutes');
const carRoutes = require('./carRoutes');
const favRoutes = require('./favRoutes')
const userRoutes = require('./userRoutes')

router.use('/', authRoutes)
router.use('/auth', authRoutes);
router.use('/car', carRoutes);
router.use('/fav', favRoutes)
router.use('/', userRoutes)

module.exports = router;