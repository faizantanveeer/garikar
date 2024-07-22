const express = require('express');
const router = express.Router();
const authRoutes = require('./authRoutes');
const carRoutes = require('./carRoutes');

router.use('/', authRoutes)
router.use('/auth', authRoutes);
router.use('/car', carRoutes);

module.exports = router;