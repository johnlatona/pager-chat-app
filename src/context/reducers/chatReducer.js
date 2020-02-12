import defaultState from '../defaultState';
import { formatTime, appendTextMessages } from '../../utils';
import { SET_TEXT_MESSAGE, SET_IMAGE_MESSAGE, ADD_PERSON_TYPING, REMOVE_PERSON_TYPING } from '../constants';

const chatReducer = (state = defaultState.chat, action) => {
  switch(action.type) {
    case SET_TEXT_MESSAGE: {
      const newMessage = action.message;
      newMessage.time = formatTime(newMessage.time);

      // handles appending new messages to the same Message display if sent in the same formatted time stamp
      const filteredMsgs = state.messages.length ? 
        state.messages.filter(message => {
          return message.username === newMessage.username;
        }) : [];
      const prevMsg = filteredMsgs[filteredMsgs.length - 1];

      if (!filteredMsgs.length || prevMsg.type !== newMessage.type || prevMsg.time !== newMessage.time) {
        return { ...state, messages: [ ...state.messages, newMessage, ]};
      }
      return { ...appendTextMessages(prevMsg, newMessage, state), };
    }
    case SET_IMAGE_MESSAGE: {
      const newMessage = action.message;
      newMessage.time = formatTime(newMessage.time);
      return { ...state, messages: [ ...state.messages, newMessage, ]};
    }
    case ADD_PERSON_TYPING: {
      const { typer } = action;
      const filteredTypers = state.peopleTyping.filter(person => person === typer);
      if (!filteredTypers.length) {
        return { ...state, peopleTyping: [ ...state.peopleTyping, typer, ]};
      }
      return state;
    }
    case REMOVE_PERSON_TYPING: {
      const { typer } = action;
      const filteredTypers = state.peopleTyping.filter(person => person !== typer);
      return { ...state, peopleTyping: filteredTypers, };
    }

    default: return state;
  }
};

export default chatReducer;
