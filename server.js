const express = require('express')
const http  = require('http')
const Server  = require("socket.io").Server
const app = express()
const path  = require('path')
const cors = require('cors');
const { exec } = require('child_process');
app.use(cors());
const pythonScriptCommand = 'python text_convertor.py ';

const server  = http.createServer(app)
const io = new Server(server , {
    cors:{
        origin:"*"
    }
})

io.on("connection" , (socket) => {
   console.log('We are connected')

   socket.on("chat messages", async (chat) => {
    
    // Assuming `chat` is an array of messages, and you want to process the last one
    const command = `${pythonScriptCommand} "${chat.text}"`

    exec(command, (scriptError, scriptStdout, scriptStderr) => {
      if (scriptError) {
        console.error(`Error running script: ${scriptError.message}`);
        return;
      }
  
      // Process the output from the Python script
      const result = scriptStdout.trim();
      console.log(`Result: ${result}`);
      
      // Update the text of the last message
      chat.text = result;
      // Emit the updated array of messages
      io.emit('chat messages', chat);
    });
  });

   socket.on('disconnect' , ()=> {
    console.log('disconnected')
   })
})



server.listen(5000 , () => console.log('Listening to port 5000'))