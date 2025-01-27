const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");
const blackListedTokenModel = require("../models/blackListedToken.model");

module.exports.authUser = async (req, res, next) => {
    console.log("Inside the auth middleware");

    const token = req.cookies?.token || (req.headers.authorization && req.headers.authorization.split(" ")[1]);
    console.log("Auth token:", token);

    if (!token) {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    try {
        // Check if token is blacklisted
        const blackListedToken = await blackListedTokenModel.findOne({ token });
        console.log("Blacklisted token:", blackListedToken);

        if (blackListedToken) {
            return res.status(401).json({ message: "Unauthorized: Token is blacklisted" });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded:", decoded);

        // Fetch the user from the database
        const user = await userModel.findById(decoded._id);
        console.log("User:", user);

        req.user = user;

        return next();
    } catch (error) {
        console.error("Error in auth middleware:", error);
        return res.status(401).json({ message: "Unauthorized" });
    }
};
