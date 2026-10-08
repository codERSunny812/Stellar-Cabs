const mongoose = require('mongoose');

const rideSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'userModel', required: true },
        captain: { type: mongoose.Schema.Types.ObjectId, ref: 'captionModel' },
        pickup: { type: String, required: true },
        destination: { type: String, required: true },
        fare: { type: Number, required: true },
        status: {
            type: String,
            enum: ['pending', 'accepted', 'ongoing', 'completed', 'cancelled'],
            default: 'pending',
        },
        otp: { type: String, select: false, required: true },
        vehicleType: { type: String, enum: ['car', 'auto', 'bike'], required: true },
        distance: { type: Number }, // in meters only
        duration: { type: Number }, //  in seconds only
    },
    { timestamps: true }
);

module.exports = mongoose.model('rideModel', rideSchema);