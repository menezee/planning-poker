import React, { useContext } from 'react';

import { SendInput } from './subcomponents/send-input';
import { PlanningContext } from '../../context';

import styles from './info-bar.module.scss';

function InfoBar() {
  const {
    votes,
    result,
    showResult,
    addStory,
  } = useContext(PlanningContext);

  return (
    <aside className={styles.container}>
      <section className={styles.container__section}>
        <SendInput placeholder='Story Name' addStory={addStory} />
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
