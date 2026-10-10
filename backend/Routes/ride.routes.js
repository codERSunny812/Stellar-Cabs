const express = require('express');
const { body, query } = require('express-validator');
const { authUser, authCaption } = require('../middleware/auth.middleware');
const { getFare, createRide, confirmRide, cancelRide, getNearbyCaptains,startRide,finishRide } = require('../controller/ride.controller');

const rideRouter = express.Router();

rideRouter.get(
    '/get-fare',
    authUser,
    [
        query('pickup').isLength({ min: 3 }).withMessage('invalid pickup'),
        query('destination').isLength({ min: 3 }).withMessage('invalid destination'),
    ],
    getFare
);

rideRouter.post(
    '/create',
    authUser,
    [
        body('pickup').isLength({ min: 3 }).withMessage('invalid pickup'),
        body('destination').isLength({ min: 3 }).withMessage('invalid destination'),
        body('vehicleType').isIn(['car', 'auto', 'bike']).withMessage('invalid vehicle type'),
    ],
    createRide
);


rideRouter.post(
    '/confirm',
    authCaption,
    [body('rideId').isMongoId().withMessage('invalid ride id')],
    confirmRide
);

rideRouter.post(
    '/cancel',
    authCaption,
    [body('rideId').isMongoId().withMessage('invalid ride id')],
    cancelRide
);


rideRouter.get(
    '/nearby-captains',
    authUser,
    [
        query('lat').isFloat({ min: -90, max: 90 }).withMessage('invalid latitude'),
        query('lng').isFloat({ min: -180, max: 180 }).withMessage('invalid longitude'),
    ],
    getNearbyCaptains
);

rideRouter.post(
    '/start',
    authCaption,
    [
        body('rideId').isMongoId().withMessage('invalid ride id'),
        body('otp').isLength({ min: 4, max: 4 }).isNumeric().withMessage('otp must be 4 digits'),
    ],
    startRide
);

rideRouter.post(
    '/finish',
    authCaption,
    [body('rideId').isMongoId().withMessage('invalid ride id')],
    finishRide
);

module.exports = rideRouter;