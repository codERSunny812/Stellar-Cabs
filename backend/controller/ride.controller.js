const { validationResult } = require('express-validator');
const rideService = require('../service/ride.service');
const captionModel = require('../models/captain.model');
const { sendMessageToSocketId } = require('../features/socket');

module.exports.getFare = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { pickup, destination } = req.query;

    try {
        const result = await rideService.getFare(pickup, destination);
        return res.status(200).json(result);
    } catch (error) {
        console.log('error in getting fare:', error.message);
        return res.status(500).json({ message: error.message });
    }
};

module.exports.createRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { pickup, destination, vehicleType } = req.body;

    try {
        const ride = await rideService.createRide({
            userId: req.user._id,
            pickup,
            destination,
            vehicleType,
        });

        // user ko OTP ke saath poori ride milegi
        const rideForUser = ride.toObject();

        // driver ko user ka naam chahiye, lekin OTP nahi
        await ride.populate('user', 'fullName email');
        const rideForCaptain = ride.toObject();
        delete rideForCaptain.otp;

        // same gaadi wale, active drivers jinka socket juda hai (3d mein "paas wale" bhi jodenge)
        const captains = await captionModel.find({
            status: 'active',
            'vechile.vechileType': vehicleType,
            socketId: { $exists: true, $ne: null },
        });

        captains.forEach((captain) => {
            sendMessageToSocketId(captain.socketId, 'new-ride', rideForCaptain);
        });

        return res.status(201).json({
            ride: rideForUser,
            notifiedCaptains: captains.length,
        });
    } catch (error) {
        console.log('error in creating ride:', error.message);
        return res.status(500).json({ message: error.message });
    }
};