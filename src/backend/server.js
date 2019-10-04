// Libs
require('dotenv').config();
const connectMongo = require('./db/config').connectMongo;
const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const cors = require('cors');
const path = require('path');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3001;

// Routes
const example = require('./api/routes/example');

// Express config
app.use(compression());
app.use(express.static(__dirname + './../../'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// the __dirname is the current directory from where the script is running
const homePage = path.join(__dirname, '../../public/index.html');

/// Serve the homePage
app.get('/', function(req, res) {
  res.sendFile(homePage);
});

/** ROUTES **/
app.use('/api/example', example);

// Handle client socket connections to server
io.on('connection', socket => {
  // Send server time to connected clients
  socket.emit('time', new Date());
  // Join client to a "room" allowing private events to be sent
  socket.on('join', data => {
    socket.join(data.id);
    io.to(data.id).emit('joined', `User ${data.id} joined`);
  });
  // Log number of connected clients to server
  console.log(io.engine.clientsCount);
  // Handle client disconnects
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// Connect to mongo DB
connectMongo(err => {
  if (err) throw err;
  // Start listening on server port once connected to DB
  http.listen(port, err => {
    if (err) throw err;
    console.log(`App is running on ${port}`);
  });
});
