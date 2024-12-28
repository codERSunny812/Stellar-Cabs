const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const cors = require('cors')
const app = express()
const connectToDb = require('./DB/db')

connectToDb() //function to connect with DB

app.use(cors())   //use the cors 

app.get('/',(req,res)=>{
    res.send("hello from the server")
})

module.exports= app //exporting the varible app