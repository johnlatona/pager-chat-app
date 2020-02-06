import defaultState from '../defaultState';
import { SET_USERNAME_TO_STATE, SET_IS_LOGGED_IN_TO_STATE } from '../constants';

const userReducer = (state = defaultState.user, action) => {
  switch(action.type) {
    case SET_USERNAME_TO_STATE: {
      const { username } = action;
      return { ...state, username, };
    }
    case SET_IS_LOGGED_IN_TO_STATE: {
      const { isLoggedIn } = action;
      return { ...state, isLoggedIn, };
    }
    default: return state;
  };
};

export default userReducer;