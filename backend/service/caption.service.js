const captionModel = require("../models/captain.model")


const createCaption = async({
firstName,lastName,email,password,color,numberPlate,capacity,model,vechileType
})=>{
    try {
       //early check
       if(!firstName || !lastName || !password || !color || !numberPlate || !capacity || !model || !vechileType){
        throw new Error("some fields are missing")
       } 

       //create the user in  DB
       const captionData = await captionModel.create({
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

       captionData.save();

       return captionData;
    } catch (error) {
    throw error;
    }


}


module.exports=createCaption