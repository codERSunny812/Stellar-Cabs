const express = require('express')
const userRouter = express.Router()
const { body } = require('express-validator');
const { registerUser , routeInfo, loginUser, getUserProfile, logoutUser } = require('../controller/user.controller');
const { authUser } = require('../middleware/auth.middleware');


// route to register a user 
userRouter
.get('/register',routeInfo)
.post('/register',[
    body('email').isEmail().withMessage("Invalid email"),
    body('fullName.firstname').isLength({min:3}).withMessage("full name must be 6 character long"),
    body('fullName.lastname').isLength({ min: 3 }).withMessage("full name must be 6 character long"),
    body('password').isLength({min:6}).withMessage("password must be atleast 6 character long")
],registerUser)


// route to login a user 
userRouter
.get('/login',routeInfo)
.post('/login',[
    body('email').isEmail().withMessage("Invalid email"),
    body('password').isLength({min:6}).withMessage("password must be atleast 6 character long")
],loginUser) // login user



//route to open profile route 
userRouter
.get('/profile',authUser,getUserProfile)



userRouter
.get('/logout',authUser,logoutUser)



module.exports=userRouter
