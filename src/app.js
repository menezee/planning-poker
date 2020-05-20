import React, { useContext } from 'react';

import { Header, Poker, UserList, StoryList, InfoBar } from './components';
import { PlanningContext } from './context';

import styles from './app.module.scss';

function App() {
  const {
    users,
    selectCard,
    stories,
    myVote,
  } = useContext(PlanningContext);

  return (
    <>
      <Header />
      <InfoBar />
      <main className={styles.main}>
        <UserList users={users} />
        <StoryList stories={stories} />
        <Poker selectCard={selectCard} selected={myVote} />
      </main>
    </>
  );
}

export default App;
