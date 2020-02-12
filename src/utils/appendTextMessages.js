const appendTextMessages = (prevMsg, newMessage, state) => {
  if (prevMsg) {
    const newMsgs = Array.isArray(prevMsg.text) ? [ ...prevMsg.text, newMessage.text] : [prevMsg.text, newMessage.text];
    prevMsg.text = newMsgs;
    state.messages[state.messages.length - 1] = prevMsg;
  }

  return state;
}

export default appendTextMessages;