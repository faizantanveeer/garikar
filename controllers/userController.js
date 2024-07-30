const jwt = require('jsonwebtoken');
const Car = require('../models/cars-model');
const User = require('../models/user-model');
const multer = require('multer');
const path = require('path');
const upload = require('../config/multer');
const cloudinary = require('../config/cloudinary');

const profileUpdate = async (req, res) => {
	try {
		const user = await User.findOne({ email: req.user.email });

		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}

		const { name } = req.body;
		let imageUrl = user.image;

		if (req.file) {
			const fileBuffer = req.file.buffer;

			// Upload the new image to Cloudinary
			const uploadResult = await new Promise((resolve, reject) => {
				cloudinary.uploader
					.upload_stream({ folder: 'uploads' }, (error, result) => {
						if (error) {
							reject('Cloudinary upload failed.');
						} else {
							resolve(result.secure_url);
						}
					})
					.end(fileBuffer);
			});

			imageUrl = uploadResult;

			
		}

		// Check for duplicate name
		const existingUser = await User.findOne({ name });
		if (
			existingUser &&
			existingUser._id.toString() !== user._id.toString()
		) {
			return res.status(400).json({
				message: 'Name already taken. Please choose another one.',
			});
		}

		user.name = name;
		user.image = imageUrl;

		await user.save();
		res.redirect('/profile');
	} catch (error) {
		console.error('Error occurred while updating profile:', error);
		res.status(500).json({
			message: 'An error occurred while updating the profile',
		});
	}
};

module.exports = {
	profileUpdate,
};
