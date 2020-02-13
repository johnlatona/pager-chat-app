import React, { useContext, useState, useEffect, useLayoutEffect, useRef } from 'react';
import { ChatState, UserState, ChatDispatch } from '../../context';
import { setMessage, fetchGif } from '../../context/actions/chatActions';
import { Message } from '../Message';
import { TypingStatusWidget } from '../TypingStatusWidget';
import { Button } from '../Button';
import './ChatWindow.css';

const ChatWindow = () => {
  const chatState = useContext(ChatState);
  const userState = useContext(UserState);
  const dispatch = useContext(ChatDispatch);
  const { socket } = userState;
  const { messages } = chatState;
  const [messageInput, setMessageInput] = useState('');
  const textInput = useRef();
  const messagesContainer = useRef();

  useEffect(() => {
    if (socket) {
      try {
        socket.on('message', message => {
          setMessage(message, dispatch);
        });
      } catch(err) {
        const message = err.message || 'Unable to listen to socket connection';
        console.error(message, err, err.stack);
      }
      textInput.current.focus();
    }
  }, [socket]);

  useLayoutEffect(() => {
    const elem = messagesContainer.current;
    if (elem) {
      const scroll = elem.scrollTop + elem.clientHeight === elem.scrollHeight;
      if (!scroll) {
        elem.scrollTop = elem.scrollHeight;
      }
    }
  });

  const handleMessageSubmit = async message => {
    setMessageInput('');
    if (message.includes('/gif')) {
      const query = message.substring(5);
      try {
        const response = await fetchGif(query);
        if (response.data && response.data.length) {
          socket.emit('image-message', {
            url: response.data[0].images.original.url,
            alt: response.data[0].title,
          });
        }
      } catch(err) {
        const message = err.message || 'Cannot fetch Gif';
        console.error(message, err, err.stack);
      }
    } else {
      socket.emit('text-message', message);
    }
  }
  return (
    socket ? 
    <div className="card chat-container">
      <div className="messages" ref={messagesContainer}>
        {messages.map((message, index) => {
          const { username } = message;
            return (
              <div className="message-container" key={index}>
                <Message message={message} username={username}/>
              </div>
            )
          })}
      </div>
      <div className="chat-input-container">
          <form className="input-form">
            <input
              className="chat-input"
              placeholder="Message"
              value={messageInput}
              onChange={(e) => {
                if (e.target.value.length === 1) {
                  socket.emit('typing', true);
                } else if (e.target.value.length === 0) {
                  socket.emit('typing', false);
                }
                setMessageInput(e.target.value)
              }}
              onFocus={(e) => {
                if (e.target.value.length) {
                  socket.emit('typing', true);
                } else {
                  socket.emit('typing', false);
                }
              }}
              onBlur={() => {
                socket.emit('typing', false);
              }}
              ref={textInput}
            >
            </input>
            <Button 
              appliedClass="send-button"
              onClick={(e) => {
                e.preventDefault();
                socket.emit('typing', false);
                handleMessageSubmit(messageInput);
              }}
              text='Send'
            />
            {/* <button
              className="send-button" 
              onClick={(e) => {
                e.preventDefault();
                socket.emit('typing', false);
                handleMessageSubmit(messageInput);
              }}>Send</button> */}
          </form>
      </div>
      <div className="typing-status">
        <TypingStatusWidget/>
      </div>
    </div>
    : null
  );
}

export default ChatWindow;