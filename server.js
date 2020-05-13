const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const path = require('path');

const Actions = require('./src/actions').Actions;

server.listen(process.env.PORT || 80);

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


const users = new Map();

function broadcast(socket, action, data) {
  socket.emit(action, data);
  socket.broadcast.emit(action, data);
}

function reset() {
  users.clear();
}

function newUser(name) {
  return {
    name,
    vote: null,
  }
}

function getAllProperty(propName) {
  return {
    from: function(map) {
      const allEntries = Array.from(map.values());
      return allEntries.map(entry => entry[propName]);
    }
  };
}

function onlyNotNull(list) {
  return list.filter(p => p !== null);
}

io.on('connection', socket => {
  socket.emit(Actions.FromServer.SET_USERS, getAllProperty('name').from(users));
  broadcast(socket, Actions.FromServer.SET_VOTES, onlyNotNull(getAllProperty('vote').from(users)));

  socket.on(Actions.FromClient.ADD_USER, name => {
    users.set(socket.id, newUser(name));

    const names = getAllProperty('name').from(users);
    broadcast(socket, Actions.FromServer.SET_USERS, names);
  });

  socket.on(Actions.FromClient.ADD_VOTE, vote => {
    const currUser = users.get(socket.id);

    users.set(socket.id, { ...currUser, vote, });

    broadcast(
      socket,
      Actions.FromServer.SET_VOTES,
      onlyNotNull(getAllProperty('vote').from(users)),
    );
  });

  socket.on('disconnect', reason => {
    users.delete(socket.id);

    broadcast(socket, Actions.FromServer.SET_USERS, getAllProperty('name').from(users));
    broadcast(socket, Actions.FromServer.SET_VOTES, onlyNotNull(getAllProperty('vote').from(users)));
  });
});
