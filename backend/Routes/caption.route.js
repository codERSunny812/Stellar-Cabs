const express = require('express')
const captionRouter = express.Router();
const { body } = require('express-validator');
const { registerCaption, checkCaption, loginCaption, getProfile, logOutCaption, checkCaptionRegister, checkCaptionLogin, updateCaptionStatus, getCaptionStats } = require('../controller/caption.controller');
const { authCaption } = require('../middleware/auth.middleware');




// route to register a caption 
captionRouter
.get('/register',checkCaptionRegister)
.post('/register',[
    body('email').isEmail().withMessage('invalid email'),
    body('fullName.firstName').isLength({min:4}).withMessage('the first name should have alteast 4 character long'),
    body('fullName.lastName').isLength({ min: 4 }).withMessage('the last name should have alteast 4 character long'),
    body('password').isLength({ min: 5 }).withMessage('the password  should have alteast 5 character long'),
    body('vechile.color').isLength({ min: 3 }).withMessage('the  vechile color should have alteast 3 character long'),
    body('vechile.numberPlate').isLength({ min: 5 }).withMessage('the  vechile number plate should have alteast 5 character long'),
    body('vechile.capacity').isLength({ min: 1 }).withMessage('the  vechile capacity should have the capacity of 1 persons'),
    body('vechile.model').isLength({ min: 3 }).withMessage('the  vechile model should have alteast 3 character long'),
    body('vechile.vechileType').isLength({ min: 3 }).withMessage('the  vechile type should have alteast 3 character long'),
],registerCaption)


// route to login a caption 
captionRouter
.get('/login',checkCaptionLogin)
.post('/login',[
    body('email').isEmail().withMessage('invalid email'),
    body('password').isLength({ min: 5 }).withMessage('the password  should have alteast 5 character long'),
],loginCaption) // login caption

//to get the profile of the caption
captionRouter.get('/profile-caption',authCaption,getProfile)


// to logout the caption 
captionRouter.get('/logout-caption',authCaption,logOutCaption)


//to update the status of the caption 
captionRouter.patch(
    '/status',
    authCaption,
    [body('status').isIn(['active', 'inactive']).withMessage('status must be active or inactive')],
    updateCaptionStatus
)



captionRouter.get('/stats', authCaption, getCaptionStats)


module.exports=captionRouter