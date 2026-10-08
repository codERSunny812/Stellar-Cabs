const { Server } = require('socket.io');
const userModel = require('../models/user.model');
const captionModel = require('../models/captain.model');

let io;

function initializeSocket(server) {
    io = new Server(server, {
        cors: { origin: '*', methods: ['GET', 'POST'] },
    });

    io.on('connection', (socket) => {
        console.log('client connected:', socket.id);

        // app khulne par user ya captain batata hai ki woh kaun hai
        socket.on('join', async ({ userId, userType }) => {
            try {
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

        socket.on('disconnect', () => {
            console.log('client disconnected:', socket.id);
        });
    });
}

// kisi ek socket ko message bhejne ke liye (3b mein kaam aayega)
function sendMessageToSocketId(socketId, event, data) {
    if (io) {
        io.to(socketId).emit(event, data);
    }
}

module.exports = { initializeSocket, sendMessageToSocketId };