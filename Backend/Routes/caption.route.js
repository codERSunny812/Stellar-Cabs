const express = require('express')
const captionRouter = express.Router();
const { body } = require('express-validator');
const { registerCaption, checkCaption } = require('../controller/caption.controller');



captionRouter
.get('/',checkCaption)
.post('/register',[
    body('email').isEmail().withMessage('invalid email'),
    body('fullName.firstName').isLength({min:4}).withMessage('the first name should have alteast 4 character long'),
    body('fullName.lastName').isLength({ min: 4 }).withMessage('the last name should have alteast 4 character long'),
    body('password').isLength({ min: 5 }).withMessage('the password  should have alteast 5 character long'),
    body('vechile.color').isLength({ min: 5 }).withMessage('the  vechile color should have alteast 5 character long'),
    body('vechile.numberPlate').isLength({ min: 5 }).withMessage('the  vechile number plate should have alteast 5 character long'),
    body('vechile.capacity').isLength({ min: 2 }).withMessage('the  vechile capacity should have the capacity of 2 persons'),
    body('vechile.model').isLength({ min: 5 }).withMessage('the  vechile model should have alteast 5 character long'),
    body('vechile.vechileType').isLength({ min: 3 }).withMessage('the  vechile type should have alteast 3 character long'),
],registerCaption)



module.exports=captionRouter