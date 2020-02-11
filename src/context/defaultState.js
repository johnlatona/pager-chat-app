const defaultState = {
  global: {
    socket: null,
  },
  user: {
    username: '',
    isLoggedIn: false,
  },
  chat: {
    messages: [],
    numTypers: 0,
  },
};

export default defaultState;