const userModel = require("../models/user.model") //default import


// function to create the user into the DB
module.exports.createUser = async({firstname,lastname,email,password})=>{
    console.log("firstname",firstname)
    console.log("lastname",lastname)
    console.log("email",email)
    console.log("password",password)

    //field check
    if(!firstname || !lastname || !email || !password){
        throw new Error("All field are required !!")
    }

    //create the user in db
    const user = await userModel.create({
        fullName:{
            firstname,
            lastname
        },
        email,
        password
    })



    return user;


}