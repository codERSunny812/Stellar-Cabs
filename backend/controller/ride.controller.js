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


module.exports.confirmRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const ride = await rideService.confirmRide({
            rideId: req.body.rideId,
            captainId: req.caption._id,
        });

        const rideData = ride.toObject();

        // user ko batao ki driver mil gaya
        const userSocketId = rideData.user?.socketId;
        delete rideData.user.socketId;

        if (userSocketId) {
            sendMessageToSocketId(userSocketId, 'ride-confirmed', rideData);
        }

        return res.status(200).json({ ride: rideData });
    } catch (error) {
        console.log('error in confirming ride:', error.message);

        if (error.message === 'ride not available') {
            return res.status(409).json({ message: 'ride already taken or cancelled' });
        }
        return res.status(500).json({ message: error.message });
    }
};

// driver ne ride cancel ki: user ko batao
module.exports.cancelRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const ride = await rideService.cancelRideByCaptain({
            rideId: req.body.rideId,
            captainId: req.caption._id,
        });

        const rideData = ride.toObject();
        const userSocketId = rideData.user?.socketId;
        delete rideData.user.socketId;

        if (userSocketId) {
            sendMessageToSocketId(userSocketId, 'ride-cancelled', rideData);
        }

        return res.status(200).json({ ride: rideData });
    } catch (error) {
        console.log('error in cancelling ride:', error.message);

        if (error.message === 'ride cannot be cancelled') {
            return res.status(409).json({ message: 'ride cannot be cancelled now' });
        }
        return res.status(500).json({ message: error.message });
    }
};


// user ke aas-paas ke online drivers (map par dikhane ke liye)
module.exports.getNearbyCaptains = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const lat = Number(req.query.lat);
    const lng = Number(req.query.lng);
    const radiusKm = 5;

    try {
        const captains = await captionModel
            .find({
                status: 'active',
                // pichhle 2 minute mein location bheji ho, yaani app sach mein khula hai
                locationUpdatedAt: { $gte: new Date(Date.now() - 2 * 60 * 1000) },
                // user se 5 km ke gol daayre ke andar (radius ko Earth ke radius se divide karte hain)
                location: {
                    $geoWithin: { $centerSphere: [[lng, lat], radiusKm / 6378.1] },
                },
            })
            .select('location vechile.vechileType')
            .limit(50);

        // sirf jagah aur gaadi ka type bhejo; naam, email kuch nahi
        const result = captains.map((captain) => ({
            id: captain._id,
            lat: captain.location.coordinates[1],
            lng: captain.location.coordinates[0],
            vehicleType: captain.vechile?.vechileType,
        }));

        return res.status(200).json({ captains: result });
    } catch (error) {
        console.log('error in nearby captains:', error.message);
        return res.status(500).json({ message: error.message });
    }
};