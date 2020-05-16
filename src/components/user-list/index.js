import React from 'react';

import styles from './user-list.module.scss';

function UserList({ users = [] }) {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Users</h1>
      <ul>
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
    </div>
  );
}

export { UserList, };
