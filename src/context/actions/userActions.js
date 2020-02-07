import io from 'socket.io-client';
import { SET_SOCKET_CONNECTION } from '../constants';

export const getSocketConnection = async (username, dispatch, socket) => {
  console.log("running getSocketConnection")
  socket = await io(`https://pager-hiring.herokuapp.com/?username=${username}`);
  setSocket(socket, dispatch);
}

const setSocket = (socket, dispatch) => {
  console.log('running set socket')
  dispatch({
    type: SET_SOCKET_CONNECTION,
    socket,
  });
}