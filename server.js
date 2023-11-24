const express = require('express')
const http  = require('http')
const Server  = require("socket.io").Server
const app = express()
const path  = require('path')
const cors = require('cors');
app.use(cors());

const server  = http.createServer(app)
const io = new Server(server , {
    cors:{
        origin:"*"
    }
})

io.on("connection" , (socket) => {
   console.log('We are connected')

   socket.on("chat messages" , chat => {
      console.log('new chat message', chat)
      io.emit('chat messages' , chat)
   } )

   socket.on('disconnect' , ()=> {
    console.log('disconnected')
   })
})



server.listen(5000 , () => console.log('Listening to port 5000'))