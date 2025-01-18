const express = require('express')
const userRouter = express.Router()
const { body } = require('express-validator');
const { registerUser , routeInfo } = require('../controller/user.controller');

userRouter
.get('/',routeInfo)
.post('/register',[
    body('email').isEmail().withMessage("Invalid email"),
    body('fullName.firstname').isLength({min:3}).withMessage("full name must be 6 character long"),
    body('fullName.lastname').isLength({ min: 3 }).withMessage("full name must be 6 character long"),
    body('password').isLength({min:6}).withMessage("password must be atleast 6 character long")
],registerUser)



module.exports=userRouter
