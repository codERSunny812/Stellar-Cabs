const userModel = require('../models/user.model')
const {validationResult} = require('express-validator')
const { createUser } = require('../service/user.service')
const blackListedTokenModel = require('../models/blackListedToken.model')

//this is the basic  user register route: 
module.exports.routeInfo=(req,res)=>{
    res.send("this is the user register route")
}

// this is the basic user login route 
module.exports.routeLoginInfo = (req, res) => {
    res.send("this is the user login route")
}

// route to register a user 
module.exports.registerUser = async (req, res) => {

    try {
        // to display the result of the express valdiation
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { fullName:{firstname, lastname}, email, password } = req.body;

        if (!email) {
            return res.status(400).json({ message: "Some field is missing required" });
        }

        // checking for the user in the DB
        const existingUser = await userModel.findOne({ email });
        
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }


        
        const hashedPassword = await userModel.hashedPassword(password);

        console.log("hashedPassword", hashedPassword);

        console.log("user creation started")

        const createdUser = await createUser({
            firstname,
            lastname,
            email,
            password: hashedPassword,
        });

        console.log("createdUser: ", createdUser);
        console.log("user created successfully");

        // sending the response to the front after creating the user in the DB
        res.status(200).json({
            data: createdUser,
            message: "The user is signed up successfully",
        });

    } catch (error) {
        console.error("Error in registerUser:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

// login route for the user
module.exports.loginUser = async(req,res)=>{
try {
    // check for the error through express-validator
    const errors = validationResult(req)

    // found error
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        })
    }

    // extracting the email and password from the request body 
    const { email, password } = req.body


    // check the email exist in the DB
    const user = await userModel.findOne({ email }).select('+password') // select the password field too from the DB during fetching


    if (!user) {
        return res.status(401).json({
            message: "Invalid email or password"
        })
    }

    //password check
    const isMatch = await user.comparePassword(password)

    if (!isMatch) {
        return res.status(400).json({
            message: "password not matched"
        })
    }


    //if password is matched then generate the token
    const token = await user.generateAuthToken()


    // storing the token in the cookies 
    res.cookie("token", token)

    // send the response
    res.status(200).json({
        data: user,
        token: token,
        message: "the user is login successfully"
    })
} catch (error) {
    console.log("error in crearting user",error)
    res.status(401).json({
    error:error
    })
}

}

//only authenticated user will have to acess this page
module.exports.getUserProfile = async(req,res)=>{

    res.status(200).json({
        message:"this is the user profile",
        data:req.user
    })
}

// logout out route for the user 
module.exports.logoutUser = async (req,res) =>{
    res.clearCookie("token");
    const token = req.cookies?.token || req.headers.authorization.split(' ')[1];

    await blackListedTokenModel.create({ token });


    return res.status(200).json({message:"user logged out successfully"})
}

