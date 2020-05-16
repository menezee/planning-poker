import React, { createContext } from 'react';

const PlanningContext = createContext();

function PlanningContextProvider({ children }) {
  return (
    <PlanningContext.Provider>
      { children }
    </PlanningContext.Provider>
  );
}

export { PlanningContextProvider, PlanningContext }
