import defaultState from '../defaultState';
import { formatTime, appendMessages } from '../../utils';
import { SET_MESSAGE } from '../constants';

const chatReducer = (state = defaultState.chat, action) => {
  switch(action.type) {
    case SET_MESSAGE: {
      const newMessage = action.message;
      newMessage.time = formatTime(newMessage.time);

      const filteredMsgs = state.messages.length ? 
        state.messages.filter(message => {
          return message.username === newMessage.username;
        }) : [];
      const prevMsg = filteredMsgs[filteredMsgs.length - 1];
      
      if (!filteredMsgs.length || prevMsg.time !== newMessage.time) {
        return { ...state, messages: [ ...state.messages, newMessage, ]};
      }
      return { ...appendMessages(prevMsg, newMessage, state), };
    }
    default: return state;
  }
};

export default chatReducer;
