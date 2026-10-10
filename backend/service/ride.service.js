const crypto = require('crypto');
const rideModel = require('../models/ride.model');
const { getDistanceTime } = require('./map.service');

// har gaadi ka rate: base fare + per km + per minute
const FARE_RATES = {
    car: { base: 50, perKm: 15, perMin: 2 },
    auto: { base: 30, perKm: 10, perMin: 1.5 },
    bike: { base: 20, perKm: 8, perMin: 1 },
};

const calculateFare = (distance, duration) => {
    const km = distance / 1000;
    const min = duration / 60;
    const fares = {};

    for (const [type, rate] of Object.entries(FARE_RATES)) {
        fares[type] = Math.round(rate.base + km * rate.perKm + min * rate.perMin);
    }

    return fares;
};

const getFare = async (pickup, destination) => {
    const { distance, duration } = await getDistanceTime(pickup, destination);
    return { fares: calculateFare(distance, duration), distance, duration };
};

// 4 digit ka OTP
const generateOtp = () => crypto.randomInt(1000, 10000).toString();

const createRide = async ({ userId, pickup, destination, vehicleType }) => {
    const { fares, distance, duration } = await getFare(pickup, destination);

    return rideModel.create({
        user: userId,
        pickup,
        destination,
        vehicleType,
        fare: fares[vehicleType],
        otp: generateOtp(),
        distance,
        duration,
    });
};

const confirmRide = async ({ rideId, captainId }) => {
    // sirf "pending" ride hi accept ho sakti hai
    const ride = await rideModel
        .findOneAndUpdate(
            { _id: rideId, status: 'pending' },
            { status: 'accepted', captain: captainId },
            { new: true }
        )
        .populate('user', 'fullName email socketId')
        .populate('captain', 'fullName vechile');

    if (!ride) {
        throw new Error('ride not available');
    }

    return ride;
};


const cancelRideByCaptain = async ({ rideId, captainId }) => {
    const ride = await rideModel
        .findOneAndUpdate(
            { _id: rideId, captain: captainId, status: 'accepted' },
            { status: 'cancelled' },
            { new: true }
        )
        .populate('user', 'fullName email socketId');

    if (!ride) {
        throw new Error('ride cannot be cancelled');
    }

    return ride;
};


// driver ne user se OTP liya: sahi ho to ride shuru
const startRide = async ({ rideId, otp, captainId }) => {
    // OTP select: false hai, isliye yahan khud maangna padega
    const ride = await rideModel
        .findOne({ _id: rideId, captain: captainId })
        .select('+otp');

    if (!ride) {
        throw new Error('ride not found');
    }
    if (ride.status !== 'accepted') {
        throw new Error('ride is not accepted');
    }
    if (ride.otp !== otp) {
        throw new Error('invalid otp');
    }

    ride.status = 'ongoing';
    await ride.save();
    await ride.populate('user', 'fullName email socketId');
    await ride.populate('captain', 'fullName vechile');

    return ride;
};

// manzil par pahunch kar ride khatam
const finishRide = async ({ rideId, captainId }) => {
    const ride = await rideModel
        .findOneAndUpdate(
            { _id: rideId, captain: captainId, status: 'ongoing' },
            { status: 'completed' },
            { new: true }
        )
        .populate('user', 'fullName email socketId')
        .populate('captain', 'fullName vechile');

    if (!ride) {
        throw new Error('ride not found or not ongoing');
    }

    return ride;
};

module.exports = { getFare, createRide, confirmRide, cancelRideByCaptain, startRide, finishRide };