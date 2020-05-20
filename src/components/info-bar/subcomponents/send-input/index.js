import React, { useState } from 'react';

import styles from './send-input.module.scss';
import sendArrowEmpty from './assets/paper-plane-regular.svg';
import sendArrowSolid from './assets/paper-plane-solid.svg';

function SendInput({ placeholder, addStory }) {
  const [input, setInput] = useState('');

  const onChange = e => {
    setInput(e.target.value);
  };

  const onSubmit = e => {
    e.preventDefault();
    addStory({ name: input, points: null });
    setInput('');
  };

  const arrowIcon = input === '' ? sendArrowEmpty : sendArrowSolid;

  return (
    <form className={styles.container} onSubmit={onSubmit}>
      <input
        name='story'
        onChange={onChange}
        value={input}
        placeholder={placeholder}
      />
      <img
        src={arrowIcon}
        alt='send arrow'
      />
    </form>
  );
}

export { SendInput, };
