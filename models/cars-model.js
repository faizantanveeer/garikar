const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CarSchema = new Schema({
        make: String,
        model: String,
        year: Number,
        color: String,
        pricePerDay: Number,
        image: String,
        specs: {
            engine: String,
            transmission: String,
            mileage: Number,
            fuelType: String
        },
        owner: { type: Schema.Types.ObjectId, ref: 'User' }, 
    ratings: [{
        user: { type: Schema.Types.ObjectId, ref: 'User' },
        rating: { type: Number, min: 1, max: 5 },
        comment: String 
    }]
});

const Car = mongoose.model('Car', CarSchema);
module.exports = Car;
