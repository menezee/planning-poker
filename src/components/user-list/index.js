import React from 'react';

import styles from './user-list.module.scss';

function UserList({ users = [] }) {
  return (
    <ul className={styles.container}>
      {
        users.map(user => (
          <li
            className={styles.user}
            key={user}
          >
            <h2>{user}</h2>
          </li>
        ))
      }
    </ul>
  );
}

export { UserList, };
