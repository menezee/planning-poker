const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);

server.listen(80);
// WARNING: app.listen(80) will NOT work here!

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

const users = [];

io.on('connection', socket => {
  socket.on('userConnected', data => {
    users.push(data);
    console.log(`data from ${socket.id}: ${data}`);
    console.log(`final arr: ${users}`);
    socket.emit('setUsers', users);
    socket.broadcast.emit('setUsers', users);
  });
});
