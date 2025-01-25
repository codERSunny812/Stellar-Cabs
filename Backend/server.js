const http =  require('http')
const app = require('./app')
const PORT = process.env.PORT || 4000



//creating a http server over express for better 
const server = http.createServer(app)



server.listen(PORT,()=>{
    console.log(`port is runnig on ${PORT}`)
})