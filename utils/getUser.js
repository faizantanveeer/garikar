const userModel = require('../models/user-model');
const jwt = require('jsonwebtoken');

const getUserFromToken = async (token) => {
    try {
        
        if (!token) {
            throw new Error('No token provided');
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const email = decoded.email;
        const user = await userModel.findOne({ email });

        if (!user) {
            throw new Error('User not found');
        }

        return user;
    } catch (err) {
        throw new Error(err.message || 'Server error');
    }
};

module.exports = { getUserFromToken };
