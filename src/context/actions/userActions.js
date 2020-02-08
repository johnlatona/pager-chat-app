import io from 'socket.io-client';
import { SET_SOCKET_CONNECTION } from '../constants';

export const getSocketConnection = async (username, dispatch) => {
  try {
    const socket = await io(`https://pager-hiring.herokuapp.com/?username=${username}`);
    setSocket(socket, dispatch);
  } catch(err) {
    const message = err.message || 'Unable to connect to socket.io server';
    console.error(message, err, err.stack);
  }
};

const setSocket = (socket, dispatch) => {
  dispatch({
    type: SET_SOCKET_CONNECTION,
    socket,
  });
}