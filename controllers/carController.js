const jwt = require('jsonwebtoken');
const Car = require('../models/cars-model');
const User = require('../models/user-model');

const listCar = async (req, res) => {
	try {
		const user = await User.findOne({ email: req.user.email });

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
		const make = req.query.make;
		let cars;

		const carname = req.query.car;
		// console.log(carname);

		// Log received make parameter for debugging

		if (make) {
			cars = await Car.find({ make: make.trim() }); // Trim to avoid issues with extra spaces
		} else {
			cars = await Car.find();
		}

		// Fetch the count of cars for each make
		const makesWithCounts = await Car.aggregate([
			{ $group: { _id: '$make', count: { $sum: 1 } } },
			{ $sort: { _id: 1 } }, // Optional: Sort by make name
		]);

		// Transform the data to a more usable format for rendering
		const makes = makesWithCounts.map((make) => ({
			name: make._id,
			count: make.count,
		}));

		if (carname === undefined) {
			return res.render('book-car', { cars, makes, flag: false });
		} else {
			return res.render('book-car', { cars, makes, carname, flag: true });
		}
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Server error while fetching cars' });
	}
};

const getCarById = async (req, res) => {
	try {
		const user = await User.findOne({ email: req.user.email });

		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}

		const id = req.params.id;

		// console.log(id)
		const car = await Car.findOne({ _id: id });
		if (!car) {
			return res.status(404).json('Car is not Present');
		}

		// console.log(car);
		const alreadyBooked = user.bookings.some(
			(booking) => booking._id.toString() === car._id.toString()
		);

		const alreadyOwner = car.owner.toString() === user._id.toString();

		// console.log(alreadyOwner	)

		res.render('car-by-id', {
			car,
			user: req.user || null,
			booked: alreadyBooked,
			owned: alreadyOwner,
		});
	} catch (err) {
		console.error(err);
		res.status(500).json({
			message: 'Server error while fetching the car',
		});
	}
};

const bookCar = async (req, res) => {
	try {
		const user = await User.findOne({ email: req.user.email });
		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}
		const id = req.params.id;

		const car = await Car.findOne({ _id: id });
		if (!car) {
			return res.status(201).send('Car Not Present');
		}

		const carOwner = car.owner.toString() === user._id.toString();
		const alreadyBooked = user.bookings.some(
			(booking) => booking._id.toString() === car._id.toString()
		);

		if (carOwner || alreadyBooked) {
			return res.redirect(`/car/getcar/${car._id}`);
		} else {
			await user.bookings.push(car._id);
			await user.save();
			const carname = encodeURIComponent(`${car.make} ${car.model}`);
			return res.redirect('/car/bookcar/?car=' + carname);
		}
	} catch (error) {
		res.status(500).send('Something Went Wrong');
	}
};

module.exports = { listCar, getAllCars, getCarById, bookCar };
