const http =  require('http')
const app = require('./app')
const PORT = process.env.PORT || 4000
const { initializeSocket } = require('./features/socket')




// express ke upar http server, taaki socket.io bhi isi par chal sake
const server = http.createServer(app)

initializeSocket(server)



server.listen(PORT,()=>{
    console.log(`port is runnig on ${PORT}`)
})
