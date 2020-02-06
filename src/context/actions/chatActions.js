import { SET_MESSAGES, SET_TYPING } from '../constants';

export const setMessages = (messages) => {
  return {
    type: SET_MESSAGES,
    messages,
  };
};

export const setTyping = (isTyping) => {
  return {
    type: SET_TYPING,
    isTyping,
  };
};