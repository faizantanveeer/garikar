const mongoose = require('mongoose');
const Car = require('../models/cars-model');
const User = require('../models/user-model'); // Adjust the path as necessary

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/garikar').then(() => {
    console.log('Connected to MongoDB');

    // Fetch a user to assign as the owner
    User.findOne({ email: 'test@test.com' }) // Adjust the query as needed
        .then(user => {
            if (!user) {
                throw new Error('User not found');
            }

            // Create car data with user._id as owner
            const carData =     {
                make: "BMW",
                model: "3 Series",
                year: 2023,
                color: "White",
                pricePerDay: 130,
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcTr1qHyK81sppGlud6FHtTbUUDhLY22xrXg&s",
                specs: {
                    engine: "2.0L Turbocharged",
                    transmission: "Automatic",
                    mileage: 0,
                    fuelType: "Petrol"
                },
                owner: user._id,
                ratings: []
            };

            // Create and save car
            const car = new Car(carData);
            return car.save();
        })
        .then(() => {
            console.log('Car saved successfully');
            mongoose.connection.close(); // Close connection after operation
        })
        .catch(err => {
            console.error('Error:', err);
            mongoose.connection.close(); // Ensure connection is closed on error
        });
});

/*
[
    {
        make: "Hyundai",
        model: "Santa Fe",
        year: 2023,
        color: "Black",
        pricePerDay: 80,
        image: "https://www.hyundaiusa.com/content/dam/hyundai/us/my2023/santa-fe/santa-fe-hero.jpg",
        specs: {
            engine: "2.5L 4-cylinder",
            transmission: "Automatic",
            mileage: 0,
            fuelType: "Petrol"
        },
        owner: user._id,
        ratings: []
    },
    {
        make: "Hyundai",
        model: "Elantra",
        year: 2023,
        color: "Red",
        pricePerDay: 60,
        image: "https://www.hyundaiusa.com/content/dam/hyundai/us/my2023/elantra/elantra-hero.jpg",
        specs: {
            engine: "2.0L 4-cylinder",
            transmission: "Automatic",
            mileage: 0,
            fuelType: "Petrol"
        },
        owner: user._id,
        ratings: []
    },
    {
        make: "Ford",
        model: "F-150",
        year: 2023,
        color: "Blue",
        pricePerDay: 110,
        image: "https://www.ford.com/content/dam/ford-com/united-states/vehicles/f-150/2023/21_21_F-150_XLT_4x4.jpg",
        specs: {
            engine: "3.3L V6",
            transmission: "Automatic",
            mileage: 0,
            fuelType: "Petrol"
        },
        owner: user._id,
        ratings: []
    },
    {
        make: "Ford",
        model: "Explorer",
        year: 2023,
        color: "Silver",
        pricePerDay: 100,
        image: "https://www.ford.com/content/dam/ford-com/united-states/vehicles/explorer/2023/21_21_Explorer_XLT.jpg",
        specs: {
            engine: "2.3L EcoBoost",
            transmission: "Automatic",
            mileage: 0,
            fuelType: "Petrol"
        },
        owner: user._id,
        ratings: []
    },
    {
        make: "BMW",
        model: "3 Series",
        year: 2023,
        color: "White",
        pricePerDay: 130,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcTr1qHyK81sppGlud6FHtTbUUDhLY22xrXg&s",
        specs: {
            engine: "2.0L Turbocharged",
            transmission: "Automatic",
            mileage: 0,
            fuelType: "Petrol"
        },
        owner: user._id,
        ratings: []
    },
    {
        make: "BMW",
        model: "X3",
        year: 2023,
        color: "Gray",
        pricePerDay: 140,
        image: "https://www.bmwusa.com/content/dam/bmwusa/x3/2023/BMW_X3_2023.jpg",
        specs: {
            engine: "2.0L Turbocharged",
            transmission: "Automatic",
            mileage: 0,
            fuelType: "Petrol"
        },
        owner: user._id,
        ratings: []
    },
    {
        make: "Audi",
        model: "A4",
        year: 2023,
        color: "Green",
        pricePerDay: 125,
        image: "https://www.audiusa.com/content/dam/audiusa/a4/2023/Audi_A4_2023.jpg",
        specs: {
            engine: "2.0L Turbocharged",
            transmission: "Automatic",
            mileage: 0,
            fuelType: "Petrol"
        },
        owner: user._id,
        ratings: []
    },
    {
        make: "Audi",
        model: "A6",
        year: 2023,
        color: "Blue",
        pricePerDay: 135,
        image: "https://www.audiusa.com/content/dam/audiusa/a6/2023/Audi_A6_2023.jpg",
        specs: {
            engine: "3.0L V6",
            transmission: "Automatic",
            mileage: 0,
            fuelType: "Petrol"
        },
        owner: user._id,
        ratings: []
    },
    {
        make: "Mercedes-Benz",
        model: "E-Class",
        year: 2023,
        color: "Silver",
        pricePerDay: 150,
        image: "https://www.mbusa.com/content/dam/mb-nafta/us/myco/my22/e-class/sedan/2022_MB_E-Class_Sedan_Silver.jpg",
        specs: {
            engine: "3.0L V6",
            transmission: "Automatic",
            mileage: 0,
            fuelType: "Petrol"
        },
        owner: user._id,
        ratings: []
    },
    {
        make: "Mercedes-Benz",
        model: "GLC",
        year: 2023,
        color: "Black",
        pricePerDay: 160,
        image: "https://www.mbusa.com/content/dam/mb-nafta/us/myco/my22/glc/suv/2022_MB_GLC_SUV_Black.jpg",
        specs: {
            engine: "2.0L Turbocharged",
            transmission: "Automatic",
            mileage: 0,
            fuelType: "Petrol"
        },
        owner: user._id,
        ratings: []
    },
    {
        make: "Chevrolet",
        model: "Corvette",
        year: 2023,
        color: "Red",
        pricePerDay: 180,
        image: "https://bringatrailer.com/wp-content/uploads/2022/06/2023_chevrolet_corvette-stingray-coupe-3lt_dscf7814-11685.jpg",
        specs: {
            engine: "6.2L V8",
            transmission: "Automatic",
            mileage: 0,
            fuelType: "Petrol"
        },
        owner: user._id,
        ratings: []
    },
    {
        make: "Chevrolet",
        model: "Tahoe",
        year: 2023,
        color: "Gray",
        pricePerDay: 140,
        image: "https://www.chevrolet.com/content/dam/chevrolet/na/us/my2023/tahoe/2023_tahoe_gray.jpg",
        specs: {
            engine: "5.3L V8",
            transmission: "Automatic",
            mileage: 0,
            fuelType: "Petrol"
        },
        owner: user._id,
        ratings: []
    },
    {
        make: "Porsche",
        model: "Cayenne",
        year: 2023,
        color: "White",
        pricePerDay: 170,
        image: "https://www.porsche.com/content/dam/porsche/usa/models/cayenne/2023/Cayenne_2023_White.jpg",
        specs: {
            engine: "3.0L Turbocharged",
            transmission: "Automatic",
            mileage: 0,
            fuelType: "Petrol"
        },
        owner: user._id,
        ratings: []
    },
    {
        make: "Porsche",
        model: "Macan",
        year: 2023,
        color: "Blue",
        pricePerDay: 160,
        image: "https://www.porsche.com/content/dam/porsche/usa/models/macan/2023/Macan_2023_Blue.jpg",
        specs: {
            engine: "2.0L Turbocharged",
            transmission: "Automatic",
            mileage: 0,
            fuelType: "Petrol"
        },
        owner: user._id,
        ratings: []
    }
]
*/