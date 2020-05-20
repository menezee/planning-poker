import React, { useState, useContext } from 'react';

import { PlanningContext } from '../../context';

import styles from './header.module.scss';

function Header() {
  const {
    addUser,
    me,
  } = useContext(PlanningContext);

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
      {
        me === null ? (
          <form className={styles.form}>
            <input
              onChange={onChange}
              placeholder='Name'
              value={name}
            />
            <button onClick={onClick}>
              Join
            </button>
          </form>) : (
          <h1>
            Hello, { me }
          </h1>
        )
      }
    </header>
  );
}

export { Header, };
