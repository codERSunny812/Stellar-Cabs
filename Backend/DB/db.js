const mongoose = require('mongoose')
const url = process.env.MONGO_URI


connectToDB = () =>{
    mongoose.connect(url)
    .then(()=>{
        console.log("mongoDB is successfully conncected")
    })
    .catch((error)=>{
        console.log("error in connecting the mongodb",error.message)
    })

}

module.exports=connectToDB; //default export
