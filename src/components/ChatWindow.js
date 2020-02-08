import React, { useContext, useState, useEffect, useRef } from 'react';
import { ChatState, UserState, ChatDispatch } from '../context';
import { setMessage, fetchGif } from '../context/actions/chatActions';
import Message from './Message';
import TypingStatusWidget from './TypingStatusWidget';

const ChatWindow = () => {
  const chatState = useContext(ChatState);
  const userState = useContext(UserState);
  const dispatch = useContext(ChatDispatch);
  const { socket } = userState;
  const { messages } = chatState;
  const [messageInput, setMessageInput] = useState('');
  const textInput = useRef();

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
      textInput.current.addEventListener('onkeyup', (e) => {
        e.preventDefault();
        socket.emit('typing', false);
      });
      textInput.current.addEventListener('onkeydown', (e) => {
        e.preventDefault();
        socket.emit('typing', true);
      });
    }
  }, [socket]);

  const handleMessageSubmit = async message => {
    setMessageInput('');
    if (message.includes('/gif')) {
      const query = message.substring(5);
      try {
        const response = await fetchGif(query);
        if (response.data && response.data.data && response.data.data.length) {
          socket.emit('image-message', {
            url: response.data.data[0].images.original.url,
            alt: response.data.data[0].title,
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
    <div className="chat-container">
    <p>CHATS</p>
      <div className="messages">
        {messages.map((message, index) => {
          const { username } = message;
            return (
              <div className="message-container" key={index}>
                <Message message={message} username={username}/>
              </div>
            )
          })}
      </div>
      <div className="chat-input">
          <form>
            <input
              value={messageInput}
              onChange={(e) => {
                socket.emit('typing', true);
                setMessageInput(e.target.value)
              }}
              ref={textInput}
            >
            </input>
            <button onClick={(e) => {
                e.preventDefault();
                socket.emit('typing', false);
                handleMessageSubmit(messageInput);
              }}>Send</button>
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