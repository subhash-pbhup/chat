// Import necessary modules
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

// Set up Express app and HTTP server
const app = express();
const server = http.createServer(app);

// Initialize Socket.IO
const io = new Server(server);

// Serve a simple HTML file
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Listen for connections on the Socket.IO server
io.on('connection', (socket) => {
  console.log('A user connected');

  // Handle incoming messages
  socket.on('chat message', (msg) => {
    console.log('Message: ' + msg);
    io.emit('chat message', msg); // Broadcast message to all clients
  });

  // Handle user disconnection
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// Start the server
server.listen(3000, () => {
  console.log('Server is listening on *:3000');
});
