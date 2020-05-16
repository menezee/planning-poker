import React from 'react';

import styles from './story-list.module.scss';

function StoryList({ stories = [] }) {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Stories</h1>
      <ul>
        {
          stories.map(({ name, points }) => (
            <li
              className={styles.story}
              key={name}
            >
              <h2>{name}{points !== null ? ` - ${points} points` : ''}</h2>
            </li>
          ))
        }
      </ul>
    </div>
  );
}

export { StoryList, };
