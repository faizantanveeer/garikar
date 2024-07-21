const express = require('express')
const {loginRouter, signUpRouter, signUpHandler, loginHandler,logoutHandler} = require('../controllers/authController')
const router = express.Router()
const isLoggedIn = require('../middleware/isLoggedIn')



router.get('/', function(req, res){
  res.render('home' )
})

router.get('/bookcar', isLoggedIn,function(req, res){
  res.render('book-car')
})

router.get('/login', loginRouter)

router.get('/signup', signUpRouter)

router.post('/auth/signup', signUpHandler)

router.post('/auth/login', loginHandler)

router.get('/auth/logout',logoutHandler)


module.exports = router