import React, { useEffect, useState, useContext } from 'react';
import { UserState } from '../context';

const TypingStatusWidget = () => {

  const userState = useContext(UserState);
  const { socket } = userState;
  const [numTypers, setNumTypers] = useState(0);
  const [personTyping, setPersonTyping] = useState('');
  
  useEffect(() => {
    if (socket) {
      socket.on('is-typing', typers => {
        console.log("TYPERS", typers);
        for (let typer in typers) {
          if (typers[typer]) {
            console.log("TYPER IS TRUE", typer)
            setNumTypers(numTypers + 1);
            setPersonTyping(typer);
          }
        }
      });
    }
  }, [socket])

  console.log("NUMTYPERS NOW", numTypers)
  return (
    <div className="is-typing-container">
      {
        (numTypers === 1) ?
          <p className="typing-message">{personTyping} is typing...</p>
          :
        (numTypers > 1) ?
          <p className="typing-message">People are typing...</p>
          : null
      }
    </div>
  )
}

export default TypingStatusWidget;