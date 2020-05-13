import React, { useState } from 'react';

import styles from './header.module.scss';

function Header({ addUser, me }) {
  const [name, setName] = useState('');

  const onClick = e => {
    e.preventDefault();
    addUser(name);
    setName('');
  };

  const onChange = e => {
    setName(e.target.value);
  };

  return (
    <header className={styles.header}>
      <h1>cat planning poker</h1>
      <form className={styles.form}>
        <input
          onChange={onChange}
          placeholder='Name'
          value={name}
        />
        <button onClick={onClick}>
          Join
        </button>
        <p>
          { me }
        </p>
      </form>
    </header>
  );
}

export { Header, };
