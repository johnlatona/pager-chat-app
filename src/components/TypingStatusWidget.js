import React, { useEffect, useContext } from 'react';
import { UserState, ChatState, ChatDispatch } from '../context';
import { addPersonTyping, removePersonTyping } from '../context/actions/chatActions';
import './styles/TypingStatusWidget.css';

const TypingStatusWidget = () => {

  const userState = useContext(UserState);
  const chatState = useContext(ChatState);
  const chatDispatch = useContext(ChatDispatch);
  const { socket } = userState;

  const { peopleTyping } = chatState;
  
  useEffect(() => {
    if (socket) {
      socket.on('is-typing', typers => {
        for (let typer in typers) {
          if (typers[typer]) {
            addPersonTyping(typer, chatDispatch);
          } else {
            if (peopleTyping.indexOf(typer) > -1) {
              removePersonTyping(typer, chatDispatch);
            }
          }
        }
      });
      return () => {
        socket.off('is-typing');
      }
    }
  }, [socket, peopleTyping]);

  return (
    <div className="is-typing-container">
    {

    }
      {
        (peopleTyping.length === 1) ?
          <p className="typing-message">{peopleTyping[0]} is typing...</p>
          :
        (peopleTyping.length > 1) ?
          <p className="typing-message">People are typing...</p>
          : null
      }
    </div>
  )
}

export default TypingStatusWidget;