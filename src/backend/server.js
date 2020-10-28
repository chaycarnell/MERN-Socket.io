require('dotenv').config();
// Libs
const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const helmet = require('helmet');
const cors = require('cors');
const path = require('path');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const port = process.env.PORT || 3001;
const { connectMongo } = require('./db/config');

// Express config
app.use(compression());
app.use(helmet());
app.use(cors());
app.use(express.static(__dirname + './../../'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Set reference to React application
const reactApp = path.join(__dirname, '../../public/index.html');

// Routes
const example = require('./api/routes/example');

// Apply routes
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
  server.listen(port, err => {
    if (err) throw err;
    console.log(`App is running on ${port}`);
  });
});

// Serve the React application
app.get('/', (req, res) => {
  res.sendFile(reactApp);
});
