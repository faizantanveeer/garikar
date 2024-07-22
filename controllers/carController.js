const jwt = require('jsonwebtoken');
const Car = require('../models/cars-model');
const { getUserFromToken } = require('../utils/getUser');
const User = require('../models/user-model');

const listCar = async (req, res) => {
	try {
		const token = req.cookies.token;
		if (!token) {
			return res.status(401).json({ message: 'No token provided' });
		}

		let user = await getUserFromToken(token);

		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}

		const {
			make,
			model,
			year,
			color,
			engine,
			transmission,
			mileage,
			fuelType,
			image,
			pricePerDay,
		} = req.body;

		const newCar = new Car({
			make,
			model,
			year,
			color,
			pricePerDay,
			image,
			specs: {
				engine,
				transmission,
				mileage,
				fuelType,
			},
			owner: user._id,
		});

		// Save the new car
		await newCar.save();

		// Add the car ID to the user's ownedCars array
		await User.findByIdAndUpdate(user._id, {
			$push: { ownedCars: newCar._id },
		});

		res.redirect('/car/bookcar');
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Server error 1' });
	}
};

const getAllCars = async (req, res) => {
	try {
		const cars = await Car.find();
		res.render('book-car', { cars });
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Server error while fetching cars' });
	}
};

const addToFavorite = async (req, res) => {
	try {
		const { carId, isFavorite } = req.body;

		console.log(`Car ID: ${carId}, isFavorite: ${isFavorite}`);

		const token = req.cookies.token;
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		const user = await User.findOne({ email: decoded.email });

		console.log(`User found: ${user}`);

		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}

		if (isFavorite) {
			// Remove from favorites
			user.favoriteCars.pull(carId);
			console.log(`Removing car ID ${carId} from favorites`);
		} else {
			// Add to favorites
			if (!user.favoriteCars.includes(carId)) {
				user.favoriteCars.push(carId);
				console.log(`Adding car ID ${carId} to favorites`);
			}
		}

		await user.save();
		console.log('Favorite status toggled successfully');
		res.status(200).json({
			message: 'Favorite status toggled successfully',
		});
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Server error' });
	}
};

module.exports = { listCar, getAllCars, addToFavorite };
