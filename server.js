const express = require('express')
const http  = require('http')
const Server  = require("socket.io").Server
const app = express()
const path  = require('path')
const cors = require('cors');
const { exec } = require('child_process');
app.use(cors());
const pythonScriptCommand = 'python text_convertor.py ';

app.get('/runPy', (req, res) => {
  const {text, src, dest} = req.query
  const command = `${pythonScriptCommand} "${text}" "${src}" "${dest}"`

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.log('error occured ro',error)
      res.status(500).send({error: error.message});
    } else {
      console.log('no error man',stdout)
      res.send({output: stdout})
    }
  })
})

const server  = http.createServer(app)
const io = new Server(server , {
    cors:{
        origin:"*"
    }
})

io.on("connection" , (socket) => {
  console.log('We are connected')

  socket.on("chat messages", async (chat) => {
    console.log('new mess', chat)
    io.emit('chat messages', chat);
  });

  socket.on('disconnect', function(reason){
    console.log('User disconnected because '+reason);
 });
})



server.listen(5000 , () => console.log('Listening to port 5000'))