const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const db = require('../db/db')

// Define the schema for a user
const UserSchema = new Schema({
	name: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	image: {type: String},
	favoriteCars: [{ type: Schema.Types.ObjectId, ref: 'Car' }],

	bookings: [
		{
			car: { type: Schema.Types.ObjectId, ref: 'Car' },
			startDate: Date,
			endDate: Date,
			totalAmount: Number,
			rating: { type: Number, min: 1, max: 5 }, // Rating provided by the user
		},
	],
	ownedCars: [{ type: Schema.Types.ObjectId, ref: 'Car' }], // List of cars owned by the user
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
