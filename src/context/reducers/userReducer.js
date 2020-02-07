import defaultState from '../defaultState';
import { SET_SOCKET_CONNECTION } from '../constants';

const userReducer = (state = defaultState.user, action) => {
  switch(action.type) {
    case SET_SOCKET_CONNECTION: {
      const { socket } = action;
      return { ...state, socket, };
    }
    default: return state;
  };
};

export default userReducer;