import React, { useState } from 'react';
import styles from './info-bar.module.scss';
import { SendInput } from './subcomponents/send-input';

function InfoBar({ votes, result, showResult, setStory }) {
  return (
    <aside className={styles.container}>
      <section className={styles.container__section}>
        <SendInput placeholder='Story Name' setStory={setStory} />
      </section>
      <section className={styles.container__section}>
        <div className={styles.container__item}>
          {
            votes.length > 0 &&
            <p>Total votes: {votes.length}</p>
          }
        </div>
        <div className={styles.container__item}>
          {
            result !== null &&
              <button onClick={showResult}>
                display votes!
              </button>
          }
        </div>
      </section>
    </aside>
  );
}

export { InfoBar };
