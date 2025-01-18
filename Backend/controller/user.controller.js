const userModel = require('../models/user.model')
const {validationResult} = require('express-validator')
const { createUser } = require('../service/user.service')

module.exports.routeInfo=(req,res)=>{
    res.send("this is the user route")
}


module.exports.registerUser = async(req,res,next,err)=>{
    const errors = validationResult(req)
      
    // found error
    if(!errors.isEmpty()){
     return res.status(400).json({
        errors:errors.array()
     })
    }

    const {firstname,lastname,email,password} = req.body()

    const hashedPassword =  await userModel.hashedPassword(password)

    const createdUser = await createUser({
        firstname,
        lastname,
        email,
        password:hashedPassword
    })

    const token = await createdUser.generateAuthToken()

    res.status(200).json({
        data:createdUser,
        token:token,
        message:"the user is sign up successfully"
    })
}