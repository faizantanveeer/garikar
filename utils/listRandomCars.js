const mongoose = require('mongoose');
const Car = require('../models/cars-model');

const generateRealCarData = () => [
    {
        make: 'Toyota',
        model: 'Camry',
        year: 2020,
        color: 'Blue',
        pricePerDay: 50,
        image: 'https://images.unsplash.com/photo-1568620892-d3f56e7b0a2a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MXwyNzUwNzR8MHwxfGFsbHwxfHx8fHx8fHwxNjgyMDEzMzA2&ixlib=rb-1.2.1&q=80&w=1080',
        specs: {
            engine: '2.5L I4',
            transmission: 'Automatic',
            mileage: 15000,
            fuelType: 'Petrol',
        },
        owner: user._id,
        ratings: [
            {
                user: '60f63b2f4f1a2c001f0d7e60', // Replace with actual user ObjectId
                rating: 4,
                comment: 'Smooth ride and great fuel efficiency.',
            },
        ],
    },
    {
        make: 'Honda',
        model: 'Civic',
        year: 2019,
        color: 'Red',
        pricePerDay: 45,
        image: 'https://images.unsplash.com/photo-1574158622688-2e16a028b6ee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MXwyNzUwNzR8MHwxfGFsbHwxfHx8fHx8fHwxNjgyMDEzMzc5&ixlib=rb-1.2.1&q=80&w=1080',
        specs: {
            engine: '2.0L I4',
            transmission: 'Manual',
            mileage: 30000,
            fuelType: 'Petrol',
        },
        owner: user._id,
        ratings: [
            {
                user: '60f63b2f4f1a2c001f0d7e61', // Replace with actual user ObjectId
                rating: 5,
                comment: 'Reliable and sporty. Love driving it!',
            },
        ],
    },
    {
        make: 'Ford',
        model: 'Mustang',
        year: 2021,
        color: 'Black',
        pricePerDay: 70,
        image: 'https://images.unsplash.com/photo-1604565513556-d6b2c92060af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MXwyNzUwNzR8MHwxfGFsbHwxfHx8fHx8fHwxNjgyMDEzMzg0&ixlib=rb-1.2.1&q=80&w=1080',
        specs: {
            engine: '5.0L V8',
            transmission: 'Automatic',
            mileage: 5000,
            fuelType: 'Petrol',
        },
        owner: user._id,
        ratings: [
            {
                user: '60f63b2f4f1a2c001f0d7e62', // Replace with actual user ObjectId
                rating: 4,
                comment: 'Powerful and stylish, but a bit heavy on fuel.',
            },
        ],
    },
    {
        make: 'BMW',
        model: 'X5',
        year: 2018,
        color: 'White',
        pricePerDay: 80,
        image: 'https://images.unsplash.com/photo-1611949313156-9f54f78738d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MXwyNzUwNzR8MHwxfGFsbHwxfHx8fHx8fHwxNjgyMDEzMzk5&ixlib=rb-1.2.1&q=80&w=1080',
        specs: {
            engine: '3.0L I6',
            transmission: 'Automatic',
            mileage: 25000,
            fuelType: 'Diesel',
        },
        owner: user._id,
        ratings: [
            {
                user: '60f63b2f4f1a2c001f0d7e63', // Replace with actual user ObjectId
                rating: 5,
                comment: 'Luxurious and comfortable SUV.',
            },
        ],
    },
    {
        make: 'Audi',
        model: 'A4',
        year: 2022,
        color: 'Silver',
        pricePerDay: 65,
        image: 'https://images.unsplash.com/photo-1627687499468-f11ff3d45f8d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MXwyNzUwNzR8MHwxfGFsbHwxfHx8fHx8fHwxNjgyMDEzNDM2&ixlib=rb-1.2.1&q=80&w=1080',
        specs: {
            engine: '2.0L I4',
            transmission: 'Automatic',
            mileage: 10000,
            fuelType: 'Petrol',
        },
        owner: '60f63b2f4f1a2c001f0d7e64', // Replace with actual user ObjectId
        ratings: [
            {
                user: '60f63b2f4f1a2c001f0d7e64', // Replace with actual user ObjectId
                rating: 4,
                comment: 'Great handling and tech features.',
            },
        ],
    },
    {
        make: 'Hyundai',
        model: 'Tucson',
        year: 2023,
        color: 'White',
        pricePerDay: 70,
        image: 'https://www.hyundaiusa.com/content/dam/hyundai/us/my2023/tucson/tucson-hero.jpg',
        specs: {
            engine: '2.5L 4-cylinder',
            transmission: 'Automatic',
            mileage: 0,
            fuelType: 'Petrol',
        },
        owner: user._id,
        ratings: [],
    },
    {
        make: 'Ford',
        model: 'Mustang',
        year: 2022,
        color: 'Red',
        pricePerDay: 90,
        image: 'https://www.ford.com/content/dam/ford-com/united-states/vehicles/mustang/2023/21_21_MUSTANG_GT_5.0.jpg',
        specs: {
            engine: '5.0L V8',
            transmission: 'Automatic',
            mileage: 0,
            fuelType: 'Petrol',
        },
        owner: user._id,
        ratings: [],
    },
    {
        make: 'BMW',
        model: 'X5',
        year: 2023,
        color: 'Black',
        pricePerDay: 120,
        image: 'https://www.bmwusa.com/content/dam/bmwusa/x5/2023/BMW_X5_M50i_2023.jpg',
        specs: {
            engine: '3.0L 6-cylinder',
            transmission: 'Automatic',
            mileage: 0,
            fuelType: 'Petrol',
        },
        owner: user._id,
        ratings: [],
    },
    {
        make: 'Audi',
        model: 'Q7',
        year: 2022,
        color: 'Silver',
        pricePerDay: 110,
        image: 'https://www.audiusa.com/content/dam/audiusa/q7/2022/Audi_Q7_2022_Silver.jpg',
        specs: {
            engine: '3.0L V6',
            transmission: 'Automatic',
            mileage: 0,
            fuelType: 'Petrol',
        },
        owner: user._id,
        ratings: [],
    },
    {
        make: 'Mercedes-Benz',
        model: 'C-Class',
        year: 2023,
        color: 'Blue',
        pricePerDay: 100,
        image: 'https://www.mbusa.com/content/dam/mb-nafta/us/myco/my22/c-class/sedan/2022_MB_CClass_Sedan_Blue.jpg',
        specs: {
            engine: '2.0L 4-cylinder',
            transmission: 'Automatic',
            mileage: 0,
            fuelType: 'Petrol',
        },
        owner: user._id,
        ratings: [],
    },
    {
        make: 'Chevrolet',
        model: 'Camaro',
        year: 2022,
        color: 'Yellow',
        pricePerDay: 85,
        image: 'https://www.chevrolet.com/content/dam/chevrolet/na/us/my2022/camaro/2022_chevrolet_camaro_zl1_yellow.jpg',
        specs: {
            engine: '6.2L V8',
            transmission: 'Manual',
            mileage: 0,
            fuelType: 'Petrol',
        },
        owner: user._id,
        ratings: [],
    },
    {
        make: 'Porsche',
        model: '911',
        year: 2023,
        color: 'Gray',
        pricePerDay: 150,
        image: 'https://www.porsche.com/content/dam/porsche/usa/models/911/2023/911_2023_Grey.jpg',
        specs: {
            engine: '3.0L Turbocharged',
            transmission: 'Automatic',
            mileage: 0,
            fuelType: 'Petrol',
        },
        owner: user._id,
        ratings: [],
    },
];

const insertRealCars = async (numCars) => {
    const cars = generateRealCarData();
    for (let i = 0; i < numCars; i++) {
        const carData = cars[i];
        const car = new Car(carData);
        await car.save();
    }
    console.log(`${numCars} cars inserted successfully`);
};

// Call this function to insert 4 cars
insertRealCars(10);