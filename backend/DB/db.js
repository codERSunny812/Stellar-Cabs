const mongoose = require('mongoose');

const url = process.env.MONGODB_URI;

const connectToDB = () => {

    console.log("MongoDB URL loaded:", !!url);

    mongoose.connect(url, {
        family: 4
    })
        .then(() => {
            console.log("mongoDB is successfully connected");
        })
        .catch((error) => {
            console.log("error in connecting the mongodb:", error);
        });
};

module.exports = connectToDB;