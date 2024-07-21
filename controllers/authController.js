const mongoose = require('mongoose');
const userModel = require('../models/user-model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const loginRouter = (req, res) => {
	res.render('login');
};

const signUpRouter = (req, res) => {
	res.render('signup');
};

const signUpHandler = (req, res) => {
	const { name, email, password } = req.body;

	try {
		bcrypt.genSalt(10, function (err, salt) {
			bcrypt.hash(password, salt, async function (err, hash) {
				const createdUser = await new userModel({
					name,
					email,
					password: hash,
				});

				const token = jwt.sign({ email }, process.env.JWT_SECRET);
				res.cookie('token', token);

				await createdUser.save();

				res.redirect('/signup');
			});
		});
	} catch (err) {
		console.log(err);
	}
};

const logoutHandler = (req, res) => {
	res.cookie("token", "")
	res.redirect('/')
}

const loginHandler = async (req, res) => {
	try {
		const { email, password } = req.body;

		const loginUser = await userModel.findOne({ email });

		if (!loginUser) {
			return res.status(404).send('Something went wrong');
		}

		const isMatch = await bcrypt.compare(password, loginUser.password);
		if (!isMatch) {
			return res.status(400).send('Invalid Password');
		}

		const token = jwt.sign({email: loginUser.email}, process.env.JWT_SECRET)
		res.cookie("token", token)
		
		return res.redirect('/bookcar')
	} catch (err) {
		console.log(err)
		return res.status(500).send(err);
	}
};

module.exports = {
	loginRouter,
	signUpRouter,
	signUpHandler,
	loginHandler,
	logoutHandler
};
