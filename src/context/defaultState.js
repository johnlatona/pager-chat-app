const defaultState = {
  user: {
    username: '',
    isLoggedIn: false,
    socket: null,
  },
  chat: {
    messages: [],
    isTyping: [],
  },
};

export default defaultState;