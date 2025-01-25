const express = require('express')
const userRouter = express.Router()
const { body } = require('express-validator');
const { registerUser , routeInfo, loginUser } = require('../controller/user.controller');

userRouter
.get('/register',routeInfo)
.post('/register',[
    body('email').isEmail().withMessage("Invalid email"),
    body('fullName.firstname').isLength({min:3}).withMessage("full name must be 6 character long"),
    body('fullName.lastname').isLength({ min: 3 }).withMessage("full name must be 6 character long"),
    body('password').isLength({min:6}).withMessage("password must be atleast 6 character long")
],registerUser)

userRouter
.get('/login',routeInfo)
.post('/login',[
    body('email').isEmail().withMessage("Invalid email"),
    body('password').isLength({min:6}).withMessage("password must be atleast 6 character long")
],loginUser) // login user



module.exports=userRouter
