import React, { createContext, useReducer } from 'react';
import reducers from './reducers';
import defaultState from './defaultState';

// reducers
const { chatReducer, userReducer } = reducers;

// user contexts
export const UserState = createContext();
export const UserDispatch = createContext();

// chat contexts
export const ChatState = createContext();
export const ChatDispatch = createContext();

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, defaultState.user);
  return (
    <UserState.Provider value={state}>
      <UserDispatch.Provider value={dispatch}>
        {children}
      </UserDispatch.Provider>
    </UserState.Provider>
  );
};

export const ChatProvider = ({ children }) => {
  const [state, dispatch] = useReducer(chatReducer, defaultState.chat);
  return (
    <ChatState.Provider value={state}>
      <ChatDispatch.Provider value={dispatch}>
        {children}
      </ChatDispatch.Provider>
    </ChatState.Provider>
  );
};