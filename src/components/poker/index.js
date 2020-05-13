import React from 'react';

import styles from './poker.module.scss';

function Poker({ selectCard, selected }) {
  const cards = [1, 2, 3, 5, 8, 13];
  const selectedClass = card => `${card === selected ? styles['card--selected'] : ''}`;

  return (
    <section className={styles.container}>
      {
        cards.map(card => (
          <article
            className={`${styles.card} ${selectedClass(card)}`}
            onClick={() => {
              selectCard(card);
            }}
            key={card}
            role='button'
          >
            {card}
          </article>
        ))
      }
    </section>
  );
}

export { Poker, };
