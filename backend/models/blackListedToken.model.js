const { default: mongoose } = require("mongoose");



const blackListedSchema = mongoose.Schema({
    token:{
        type:String,
        required:true,
        unique:true
    },
    createdAt:{
        type:String,
        default:Date.now(),
        expires:86400 //24 hour in second
    }
})


module.exports = mongoose.model("blackListedModel",blackListedSchema)