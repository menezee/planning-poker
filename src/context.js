import React, { createContext, useState, useEffect } from 'react';
import io from 'socket.io-client';

import { Actions } from './actions';

const PlanningContext = createContext();

function PlanningContextProvider({ children }) {
  const [socket] = useState(() => io.connect('/'));

  const [me, setMe] = useState(null);
  const [myVote, setMyVote] = useState(null);

  const [users, setUsers] = useState([]);
  const [votes, setVotes] = useState([]);
  const [stories, setStories] = useState([]);
  const [result, setResult] = useState(null);

  useEffect(() => {
    socket.on(Actions.FromServer.SET_USERS, allUsers => {
      setUsers(allUsers);
    });

    socket.on(Actions.FromServer.SET_VOTES, votes => {
      setVotes(votes);
    });
  }, [socket]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const everybodyVoted = votes.length > 0 && votes.length === users.length;

    if (everybodyVoted) {
      const hashedVotes =
        votes.reduce((acc, curr) => { acc[curr] = (acc[curr] || 0) + 1; return acc }, {});

      const mostVotedEntry =
        Object
          .entries(hashedVotes)
          .reduce(
            ([highestKey, highestVal], [key, val]) =>
              val > highestVal
                ? [key, val]
                : [highestKey, highestVal]
            );

        const [mostVoted] = mostVotedEntry;
        setResult(mostVoted);
    }
  }, [votes, users]);

  const addUser = name => {
    setMe(name);
    socket.emit(Actions.FromClient.ADD_USER, name);
  };

  const selectCard = card => {
    setMyVote(card);
    socket.emit(Actions.FromClient.ADD_VOTE, card);
  };

  const setPoints = (points, storyIndex) => {
    setStories(oldStories => {
      const newStories = [...oldStories];
      newStories[storyIndex].points = points;
      return newStories;
    });
  };

  const showResult = () => {
    alert(`Result: ${result}`);
    const firstStoryWithoutPoints = stories.findIndex(({ points }) => points === null);

    setPoints(result, firstStoryWithoutPoints);
  };

  const addStory = newStory => {
    setStories(oldStories => [...oldStories, newStory]);
  };

  return (
    <PlanningContext.Provider
      value={{
        me, setMe,
        users, setUsers,
        votes, setVotes,
        addUser,
        selectCard,
        myVote, setMyVote,
        result, setResult,
        showResult,
        addStory,
        stories,
      }}
    >
      { children }
    </PlanningContext.Provider>
  );
}

export { PlanningContextProvider, PlanningContext }
