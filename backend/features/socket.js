const { Server } = require('socket.io');
const userModel = require('../models/user.model');
const captionModel = require('../models/captain.model');
const rideModel = require('../models/ride.model');

let io;

function initializeSocket(server) {
    io = new Server(server, {
        cors: {
            origin: process.env.CLIENT_URL ? process.env.CLIENT_URL.split(",") : '*',
            methods: ['GET', 'POST'],
        },
    });

    io.on('connection', (socket) => {
        console.log('client connected:', socket.id);

        // app khulne par user ya captain batata hai ki woh kaun hai
        socket.on('join', async ({ userId, userType }) => {
            try {
                // yaad rakho yeh socket kiska hai (chat aur location mein kaam aayega)
                // await se pehle, taaki turant aane wale events ko bhi pata ho
                socket.data.userId = String(userId);
                socket.data.userType = userType;

                if (userType === 'user') {
                    await userModel.findByIdAndUpdate(userId, { socketId: socket.id });
                } else if (userType === 'caption') {
                    await captionModel.findByIdAndUpdate(userId, { socketId: socket.id });
                }

                console.log(`${userType} ${userId} joined with socket ${socket.id}`);
            } catch (error) {
                console.log('error in join:', error);
            }
        });

        // driver har kuch second mein apni location bhejta hai
        socket.on('update-location', async ({ lat, lng } = {}) => {
            try {
                if (socket.data.userType !== 'caption') return;

                const latitude = Number(lat);
                const longitude = Number(lng);
                if (
                    !Number.isFinite(latitude) || !Number.isFinite(longitude) ||
                    Math.abs(latitude) > 90 || Math.abs(longitude) > 180
                ) {
                    return;
                }

                await captionModel.findByIdAndUpdate(socket.data.userId, {
                    location: { type: 'Point', coordinates: [longitude, latitude] },
                    locationUpdatedAt: new Date(),
                });
            } catch (error) {
                console.log('error in update-location:', error.message);
            }
        });

        // ride ke dauraan user aur driver ki chat
        socket.on('send-message', async ({ rideId, text } = {}, ack) => {
            const reply = typeof ack === 'function' ? ack : () => { };

            try {
                const message = String(text ?? '').trim();
                if (!message || message.length > 500) {
                    return reply({ ok: false, error: 'invalid message' });
                }

                const ride = await rideModel
                    .findById(rideId)
                    .populate('user', 'socketId')
                    .populate('captain', 'socketId');

                // chat sirf accept ke baad aur ride khatam hone se pehle
                if (!ride || !['accepted', 'ongoing'].includes(ride.status)) {
                    return reply({ ok: false, error: 'chat not available for this ride' });
                }

                // bhejne wala sach mein isi ride ka user ya driver hai?
                const { userId, userType } = socket.data;
                const isUser = userType === 'user' && String(ride.user?._id) === userId;
                const isCaptain = userType === 'caption' && String(ride.captain?._id) === userId;

                if (!isUser && !isCaptain) {
                    return reply({ ok: false, error: 'you are not part of this ride' });
                }

                const receiverSocketId = isUser ? ride.captain?.socketId : ride.user?.socketId;
                const payload = {
                    rideId: String(ride._id),
                    text: message,
                    from: userType,
                    at: new Date().toISOString(),
                };

                if (receiverSocketId) {
                    io.to(receiverSocketId).emit('new-message', payload);
                }

                return reply({ ok: true, message: payload });
            } catch (error) {
                console.log('error in send-message:', error.message);
                return reply({ ok: false, error: 'could not send message' });
            }
        });

        socket.on('disconnect', () => {
            console.log('client disconnected:', socket.id);
        });
    });
}

// kisi ek socket ko message bhejne ke liye
function sendMessageToSocketId(socketId, event, data) {
    if (io) {
        io.to(socketId).emit(event, data);
    }
}

module.exports = { initializeSocket, sendMessageToSocketId };