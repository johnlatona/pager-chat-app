import defaultState from '../defaultState';
import { SET_MESSAGES, SET_TYPING } from '../constants';

const chatReducer = (state = defaultState.chat, action) => {
  switch(action.type) {
    case SET_MESSAGES: {
      const { messages } = action;
      return { ...state, messages, };
    }
    case SET_TYPING: {
      const { isTyping } = action; 
      return { ...state, isTyping, };
    }
    default: return state;
  }
};

export default chatReducer;
