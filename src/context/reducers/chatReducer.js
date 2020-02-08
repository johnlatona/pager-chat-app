import defaultState from '../defaultState';
import { SET_MESSAGE, SET_TYPING } from '../constants';

const chatReducer = (state = defaultState.chat, action) => {
  switch(action.type) {
    case SET_MESSAGE: {
      const { message } = action;
      return { ...state, messages: [ ...state.messages, message, ]};
    }
    default: return state;
  }
};

export default chatReducer;
