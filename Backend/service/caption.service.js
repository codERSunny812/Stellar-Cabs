const captionModel = require("../models/captain.model")


const createCaption = async({
firstName,lastName,password,color,numberPlate,capacity,model,vechileType
})=>{
    try {
       //early check
       if(!firstName || !lastName || !password || !color || !numberPlate || !capacity || !model || !vechileType){
        throw new Error("some fields are missing")
       } 

       //create the user in  DB
       const captionData = captionModel.create({
        fullName:{
            firstName,
            lastName
        },
        email,
        password,
        vechile:{
            color,
            numberPlate,
            capacity,
            model,
            vechileType
        }
       })

       return captionData;
    } catch (error) {
       console.log("error in creating the caption",error.message); 
    }

}


module.exports=createCaption