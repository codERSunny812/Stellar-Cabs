const userModel = require('../models/user.model')
const {validationResult} = require('express-validator')
const { createUser } = require('../service/user.service')
const blackListedTokenModel = require('../models/blackListedToken.model')

//this is the basic  user route: 
module.exports.routeInfo=(req,res)=>{
    res.send("this is the user register and login route")
}

// route to register a user 
module.exports.registerUser = async (req, res) => {

    console.log("registerUser started",req.body);
    try {
        // to display the result of the express valdiation
        const errors = validationResult(req);

        console.log("errors", errors);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { fullName:{firstname, lastname}, email, password } = req.body;

        if (!email) {
            return res.status(400).json({ message: "Some field is missing required" });
        }

        // logs the request body
        console.log("req.body", req.body);

        // checking for the user in the DB
        const existingUser = await userModel.findOne({ email });

        //existing user check
        console.log("existingUser", existingUser);
        
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

        // console.log("token generation started");
        // const token = createdUser.generateAuthToken();

        // console.log("token", token);


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
    // check for the error through express-validator
    const errors = validationResult(req)
      
    // found error
    if(!errors.isEmpty()){
     return res.status(400).json({
        errors:errors.array()
     })
    }

    // extracting the email and password from the request body 
    const {email,password} = req.body
    
    console.log("email:",email)
    console.log("password:",password)

    console.log("user login started")

    console.log("checking  that the email exist in the DB")

    // check the email exist in the DB
    const user = await userModel.findOne({email}).select('+password') // select the password field too from the DB during fetching
    console.log("user",user)

    if(!user){
        return res.status(401).json({
            message:"Invalid email or password"
        })
    }

    console.log("password check started")

     //password check
    const isMatch = await user.comparePassword(password)

    console.log("password Matched or not:",isMatch)

    if(!isMatch){
        return res.status(400).json({
            message:"password not matched"
        })
    }

    
    console.log("password matched")

    console.log("generate the token:")

    //if password is matched then generate the token
    const token = await user.generateAuthToken()

    console.log("token",token)

    // storing the token in the cookies 
    res.cookie("token",token)

    console.log("send the response")
    
    // send the response``
    res.status(200).json({
        data:user,
        token:token,
        message:"the user is login successfully"
    })

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