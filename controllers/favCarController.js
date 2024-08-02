const jwt = require('jsonwebtoken');
const Car = require('../models/cars-model');
const User = require('../models/user-model');

const addToFavorite = async (req, res) => {
    try {
        const { carId, isFavorite } = req.body;

        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({ email: decoded.email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (isFavorite) {
            // Remove from favorites
            user.favoriteCars.pull(carId);
            await user.save();
            return res.status(200).json({
                message: 'Car removed from favorites successfully',
                isFavorite: false
            });
        } else {
            // Add to favorites
            if (!user.favoriteCars.includes(carId)) {
                user.favoriteCars.push(carId);
                await user.save();
            }
            return res.status(200).json({
                message: 'Car added to favorites successfully',
                isFavorite: true
            });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};


const getAllFavCars = async (req, res) => {
	const token = req.cookies.token;
	const decoded = jwt.verify(token, process.env.JWT_SECRET);
	const user = await User.findOne({ email: decoded.email }).populate(
		'favoriteCars'
	);

	// console.log(`User found: ${user}`);

	if (!user) {
		return res.status(404).json({ message: 'User not found' });
	}


	res.render('fav-cars', { user: user, userData: user });
};
module.exports = { addToFavorite, getAllFavCars };
