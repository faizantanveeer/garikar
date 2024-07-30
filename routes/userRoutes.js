const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middleware/isLoggedIn');
const { profileUpdate } = require('../controllers/userController');
const upload = require('../config/multer');
const User = require('../models/user-model');

router.get('/profile', isLoggedIn, async (req, res) => {
	const user = await User.findOne({ email: req.user.email });

	if (!user) {
		return res.status(404).json({ message: 'User not found' });
	}
	res.render('profile', { userData: user });
});

router.post('/profile/update',isLoggedIn,upload.single('image'),profileUpdate);

module.exports = router;
