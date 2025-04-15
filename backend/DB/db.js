const mongoose = require('mongoose')
const url = process.env.MONGO_URI


const connectToDB = () =>{
    mongoose.connect(url)
    .then(()=>{
        console.log("mongoDB is successfully connected:");
    })
    .catch((error)=>{
        console.log("error in connecting the mongodb",error.message); 
    })

}


module.exports=connectToDB; //default export
