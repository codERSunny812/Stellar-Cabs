const {validationResult} = require('express-validator');
const captionModel = require('../models/captain.model');
const createCaption = require('../service/caption.service');


module.exports.checkCaption = async(req,res)=>{
res.send("caption route is working good")
}
module.exports.registerCaption = async(req,res,next)=>{

try {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array()

    });

   const {fullName,email,password,vechile} = req.body;

   const isCaptionExist = await captionModel.find({email});

   if(isCaptionExist){
    res.status(301).json({
        message:"caption already exist by this email"
    })
   }

   //hashing the password 
   const hashedPassword = await captionModel.hashedPassword(password);


   const caption = createCaption({
    firstName:fullName.firstName,
    lastName:fullName.lastName,
    email,
    password:hashedPassword,
    color:vechile.color,
    numberPlate:vechile.numberPlate,
    capacity:vechile.capacity,
    model:vechile.model,
    vechileType:vechile.vechileType
   })

   //generate the token
   const token = await caption.generateAuth()

   return res.status(201).json({
    token,
    caption
   })
} 
} catch (error) {
    console.log("error in creating the caption")
}
}