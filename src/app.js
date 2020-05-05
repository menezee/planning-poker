import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

import './styles.css';

function App() {
  const [name, setName] = useState('');

  const [socket] = useState(() => io.connect('localhost'));
  const [users, setUsers] = useState([]);

  useEffect(() => {
    socket.on('setUsers', allUsers => {
      console.log('user connected', setUsers);
      setUsers(allUsers);
    });
  }, [socket]);

  const join = e => {
    e.preventDefault();
    setName('');
    socket.emit('userConnected', name);
  };

  return (
    <div>
      <header className='header'>
        <h1>cat planning poker</h1>
        <form className='form'>
          <input
            onChange={e => {
              setName(e.target.value);
            }}
            placeholder='Name'
            value={name}
          />
          <button
            onClick={join}
          >
            Join
          </button>
        </form>
      </header>
      <div className='container'>
        {
          users.map(user => (
            <div className='user' key={user}>
              <h3>{user}</h3>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default App;
