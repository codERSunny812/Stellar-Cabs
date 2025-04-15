const mongoose = require("mongoose");
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const jwt_secret = process.env.JWT_SECRET

const captionSchema = mongoose.Schema({
  fullName: {
    firstName: {
      type: String,
      required: true,
      minLength: [4, "first name must be atleast 4 character long"],
    },
    lastName: {
      type: String,
      minLength: [4, "last name must be at least 4 character long"],
    },
  },
  email:{
    type:String,
    required:true,
    unique:true,
    lowercase:true,
    match: [/^\S+@\S+\.\S+$/, "Enter a valid email"]
  },
  password:{
    type:String,
    unique:true,
    required:true,
    select:false
  },
  socketId:{
    type:String
  },
  status:{
    type:String,
    enum:['active','inactive'],
    default:'inactive',
  },
  vechile:{
    color:{
    type:String,
    required:true,
    minLength:[3,"color must be at leaset 3 character long"]
    },
    numberPlate:{
    type:String,
    required:true,
    unique:true,
    minLength:[5,"number plate must be atleast 5 character long"]
    },
    capacity:{
    type:String,
    required:true,
    minLength:[1,"vechile has atlest 1 passenger capacity"]
    },
    model:{
    type:String,
    required:true,
    minLength:[3,"model name will have atleast 3 character long"]
    },
    vechileType:{
    type:String,
    required:true,
    enum:["car","bike","auto"]
    }

  },
  location:{
    latitude:{
        type:Number
    },
    longitude:{
        type:Number
    }
  }
});

// methods for captain

captionSchema.methods.generateAuth=  function(){
  const token = jwt.sign({_id:this._id}, jwt_secret, {expiresIn:'24h'});
  return token;
}

captionSchema.methods.comparePassword = async function(password){
return await bcrypt.compare(password,this.password)
}

//can be called directly by the usermodel
captionSchema.statics.hashedPassword= async function(password){
return await bcrypt.hash(password,10);
}


const captionModel = mongoose.model("captionModel", captionSchema);

module.exports = captionModel //default export
