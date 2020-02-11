const appendMessages = (prevMsg, newMessage, state) => {
  const { type } = newMessage;
  if (type === 'image') {
    type = 'url';
  }
  if (type === 'text') {
    let newMsgs;
    if (prevMsg) {
      newMsgs = Array.isArray(prevMsg[type]) ? [ ...prevMsg[type], newMessage[type]] : [prevMsg[type], newMessage[type]];
    }
    newMsgs = [newMessage[type]];
    // const newMsgs = prevMsg && Array.isArray(prevMsg[type]) ? [ ...prevMsg[type], newMessage[type]] : [prevMsg[type], newMessage[type]];
    state.messages.map(message => {
      if (message.username === newMessage.username) {
        message[type] = newMsgs;
      }
    });
    return state;
  }
}

export default appendMessages;