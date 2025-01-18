const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const cors = require('cors')
const app = express()
const connectToDb = require('./DB/db') //default import
const userRouter = require('./Routes/user.routes')

connectToDb() //function to connect with DB

app.use(cors())//use the cors 
app.use(express.json()) //to parse json request
app.use(express.urlencoded({extended:true}))

app.use('/users',userRouter)

app.get('/',(req,res)=>{
    res.send("hello from the server")
})

module.exports= app //exporting the varible app