const userModel = require('../models/user.model')
const {validationResult} = require('express-validator')
const { createUser } = require('../service/user.service')

//this is the basic  user route: 
module.exports.routeInfo=(req,res)=>{
    res.send("this is the user route")
}

// route to register a user 
module.exports.registerUser = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { fullName:{firstname, lastname}, email, password } = req.body;
        // logs the request body
        console.log("req.body", req.body);

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

        console.log("createdUser", createdUser);
        console.log("user created successfully");

        console.log("token generation started");
        const token = createdUser.generateAuthToken();

        console.log("token", token);


        res.status(200).json({
            data: createdUser,
            token,
            message: "The user is signed up successfully",
        });
    } catch (error) {
        console.error("Error in registerUser:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};



// login route for the user
module.exports.loginUser = async(req,res,next)=>{
    // check for the error through express-validator
    const errors = validationResult(req)
      
    // found error
    if(!errors.isEmpty()){
     return res.status(400).json({
        errors:errors.array()
     })
    }

    const {email,password} = req.body
    console.log("email",email)
    console.log("password",password)

    console.log("user login started")

    console.log("check the email exist in the DB")

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

    console.log("isMatch",isMatch)

    if(!isMatch){
        return res.status(400).json({
            message:"password not matched"
        })
    }

    console.log("password matched")

    console.log("generate the token")
    //  if password is matched then generate the token
    const token = await user.generateAuthToken()

    console.log("token",token)

    console.log("send the response")
    
    // send the response``
    res.status(200).json({
        data:user,
        token:token,
        message:"the user is login successfully"
    })

}




module.exports.getUserProfile = async(next,req,res,err)=>{

}