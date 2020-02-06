import { SET_USERNAME_TO_STATE, SET_IS_LOGGED_IN_TO_STATE } from '../constants';

export const setUsernameToState = (username, dispatch) => {
  dispatch({
    type: SET_USERNAME_TO_STATE,
    username,
  });
};

export const setIsLoggedIn = (isLoggedIn, dispatch) => {
  dispatch({
    type: SET_IS_LOGGED_IN_TO_STATE,
    isLoggedIn,
  });
};