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

const io = require('socket.io')(server, {
  cors: {
    methods: ['GET', 'POST'],
  },
});

const port = process.env.PORT || 3001;
const { connectMongo } = require('./db/config');

// Express config
app.use(compression());
app.use(helmet());
app.use(cors());
app.use(express.static(path.join(__dirname, './../../')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routes
const example = require('./api/routes/example');

// Apply routes
app.use('/api/public', example);

// Handle client socket connections to server
io.on('connection', (socket) => {
  // Send server time to connected clients
  setInterval(() => {
    socket.emit('time', new Date());
  }, 1000);
  // Join client to a "room" allowing private events to be sent
  socket.on('join', (data) => {
    socket.join(data.id);
    io.to(data.id).emit('joined', `User ${data.id} joined`);
  });
  // Log number of connected clients to server
  console.info('Connected clients: ', io.engine.clientsCount);
  // Handle client disconnects
  socket.on('disconnect', () => {
    console.info('Client disconnected');
  });
});

// Serve React app
// Wildcard match will handle returning index when page is refreshed
// Routing would otherwise return and error i.e. 'cannot get /someRoute'
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/index.html'));
});

// Connect to mongo DB
connectMongo((mongoError) => {
  if (mongoError) throw mongoError;
  // Start listening on server port once connected to DB
  server.listen(port, (serverError) => {
    if (serverError) throw serverError;
    console.info(`App is running on ${port}`);
  });
});
