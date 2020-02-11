import React, { useEffect, useState, useContext } from 'react';
import { UserState } from '../context';
import './styles/TypingStatusWidget.css'

const TypingStatusWidget = () => {

  const userState = useContext(UserState);
  const { socket } = userState;
  const [peopleTyping, setPeopleTyping] = useState([]);
  
  useEffect(() => {
    if (socket) {
      socket.emit()
      socket.on('is-typing', typers => {
        for (let typer in typers) {
          if (typers[typer]) {
            setPeopleTyping(prevState => [ ...prevState, typer]);
          } else {
            removePerson(typer);
          }
        }
      });
    }
  }, [socket]);

  const removePerson = person => {
    const indexOfPerson = peopleTyping.indexOf(person);
    peopleTyping.splice(indexOfPerson, 1);
    setPeopleTyping(peopleTyping);
  }

  return (
    <div className="is-typing-container">
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