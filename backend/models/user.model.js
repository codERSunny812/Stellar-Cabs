const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const jwt_secret = process.env.JWT_SECRET

// schema of the user 
const userSchema = mongoose.Schema({
    fullName:{
        firstname:{
            type:String,
            required:true,
            minlength:[3,"first  name should be greater than 3 character"]  //enums
        },
        lastname:{
            type: String,
            required: true,
            minlength: [3, "last  name should be greater than 3 character"]
        }
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
        select:false //this is a special query so that the password will not be come in any find request
    },
    socketId:{
        type:String
    }
})

//can be called by the document instance(Object)
userSchema.methods.generateAuthToken = function(){
const token = jwt.sign({_id:this._id},jwt_secret , {expiresIn:'24h'})
return token;
}

userSchema.methods.comparePassword = async function(password){
return await bcrypt.compare(password,this.password)
}

//can be called directly by the usermodel
userSchema.statics.hashedPassword= async function(password){
return await bcrypt.hash(password,10);
}


const userModel = mongoose.model('userModel',userSchema);

module.exports=userModel //default export