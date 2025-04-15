const {validationResult} = require('express-validator');
const captionModel = require('../models/captain.model');
const createCaption = require('../service/caption.service');
const blackListedTokenModel = require('../models/blackListedToken.model');


module.exports.checkCaptionRegister = async(req,res)=>{
res.send("caption register route is working perfectly")
}

module.exports.checkCaptionLogin = async (req, res) => {
    res.send("caption  login route is working perfectly")
}

module.exports.registerCaption = async(req,res,next)=>{
try {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array()});
    }

   const {fullName:{firstName,lastName},email,password,vechile} = req.body;

   const isCaptionExist = await captionModel.findOne({email});

   if(isCaptionExist){
    return res.status(301).json({
        message:"caption already exist by this email"
    })
   }

   //hashing the password 
   const hashedPassword = await captionModel.hashedPassword(password);


   const caption = await createCaption({
    firstName,
    lastName,
    email,
    password:hashedPassword,
    color:vechile.color,
    numberPlate:vechile.numberPlate,
    capacity:vechile.capacity,
    model:vechile.model,
    vechileType:vechile.vechileType
   })


    console.log("caption created successfully")

   return res.status(201).json({
    msg:"the caption is created successfully",
    data:caption
   })
} 
catch (error) {
    console.log("error:", error);

    // ✅ Handle duplicate key error
    if (error.code === 11000) {
        const field = Object.keys(error.keyValue)[0];
        const value = error.keyValue[field];

        return res.status(409).json({
            message: `Duplicate value for "${field}": "${value}" already exists.`,
            field
        });
    }

    return res.status(500).json({
        message: "Error in creating the caption"
    });
}
}






module.exports.loginCaption = async(req,res,next)=>{
try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {email,password} = req.body;

    console.log("email:",email)
    console.log("password:",password)

    console.log("checking the caption in the DB")

    const caption = await captionModel
    .findOne({email})
    .select('+password');

    console.log("checking the caption in the DB end",caption)

    if(!caption){
        return res.status(404).json({
            message:"caption not found"
        })
    }

    console.log("checking the password with the DB")

    const isPasswordMatch = await caption.comparePassword(password);

    if(!isPasswordMatch){
        return res.status(400).json({
            message:"password is incorrect"
        })
    }

    console.log("password matched successfully");


    console.log("generating the token ")

    const token = await caption.generateAuth();

    console.log("token generated successfully",token)


    res.cookie('token',token);

    return res.status(200).json({
        token,
        caption
    })

} catch (error) {
    console.log("error in login the caption")
    return res.status(500).json({
        message:"internal server error"
    })
}


}



module.exports.getProfile = async(req,res,next)=>{
try {
    const caption = req.caption;

    return res.status(200).json({
        caption
    })
}catch(error){
    console.log("error in getting the profile")
    return res.status(500).json({
        message:"internal server error"
    })
}   
}


module.exports.logOutCaption = async(req,res)=>{
    try {
            res.clearCookie("token");
            const token = req.cookies?.token || req.headers.authorization.split(' ')[1];

            console.log("token:",token)
        
            await blackListedTokenModel.create({ token });


        
        
            return res.status(200).json({message:"caption logged out successfully"})
    } catch (error) {
        console.log("error in logout the caption:",error)
        return res.status(500).json({
            message:"internal server error"
        })
    }
}