
const User = require('../models/user-model'); // Adjust the path to your User model

const attachUserData = async (req, res, next) => {
    if (req.user && req.user.email) {
      try {
        const user = await User.findOne({ email: req.user.email }).lean();
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
