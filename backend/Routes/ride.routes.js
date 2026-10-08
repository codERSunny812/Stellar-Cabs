const express = require('express');
const { body, query } = require('express-validator');
const { authUser } = require('../middleware/auth.middleware');
const { getFare, createRide } = require('../controller/ride.controller');

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

module.exports = rideRouter;