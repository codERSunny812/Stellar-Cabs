const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userSchema = mongoose.Schema({
    fullName:{
        firstname:{
            type:String,
            required:true,
            minlength:[3,"first  name should be greater than 3 character"]

        },
        lastname:{
            type: String,
            required: true,
            minlength: [3, "last  name should be greater than 3 character"]
        }
    },
    password:{
        type:String,
        required:true,
        select:false
    },
    socketId:{
        type:String
    }
})