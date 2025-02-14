const mongoose = require("mongoose");

const captionSchema = mongoose.Schema({
  fullName: {
    firstName: {
      type: String,
      required: true,
      minLength: [5, "first name must be atleast 5 character long"],
    },
    lastName: {
      type: String,
      minLength: [6, "last name must be at least 6 character long"],
    },
  },
  email:{
    type:String,
    required:true,
    unique:true,
    lowercase:true,
    match:[/^\S+@\S+\.\s+$/,"enter a valid email"]
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

const captionModel = mongoose.model("captionModel", captionSchema);
