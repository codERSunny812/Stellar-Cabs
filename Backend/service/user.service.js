const userModel = require("../models/user.model")


module.exports.createUser = async({firstname,lastname,email,password})=>{
    //field check
    if(!firstname || !lastname || !email || !password){
        throw new Error("Some field  is missing !!")
    }

    //create the user 
    const user = userModel.create({
        fullName:{
            firstname,
            lastname
        },
        email,
        password
    })



    return user;


}