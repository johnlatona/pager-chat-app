import defaultState from '../defaultState';
import { SET_MESSAGE, SET_TYPING } from '../constants';

const chatReducer = (state = defaultState.chat, action) => {
  switch(action.type) {
    case SET_MESSAGE: {
      console.log("MESSAGE IN REDUCER", action.message)
      const { message } = action;
      return { ...state, messages: [ ...state.messages, message, ]};
    }
    case SET_TYPING: {
      const { isTyping } = action; 
      return { ...state, isTyping, };
    }
    default: return state;
  }
};

export default chatReducer;
