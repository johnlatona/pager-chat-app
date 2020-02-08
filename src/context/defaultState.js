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
    isTyping: [],
  },
};

export default defaultState;