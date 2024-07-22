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
module.exports = { listCar, getAllCars };
