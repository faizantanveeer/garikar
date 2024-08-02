const User = require('../models/user-model'); // Adjust the path to your User model

const attachUserData = async (req, res, next) => {
	if (req.user && req.user.email) {
		try {
			const token = req.cookies.token;
			const decoded = jwt.verify(token, process.env.JWT_SECRET);
			const user = await User.findOne({ email: decoded.email });

			if (!user) {
				return res.status(404).json({ message: 'User not found' });
			}

			res.locals.userData = user || {};
		} catch (error) {
			console.error('Error fetching user data:', error);
			res.locals.userData = {};
		}
	} else {
		res.locals.userData = {};
	}
	next();
};

module.exports = attachUserData;
