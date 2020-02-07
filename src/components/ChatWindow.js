import React, { useContext, useState, useEffect } from 'react';
import { ChatState, UserState, ChatDispatch } from '../context';
import { setMessage, fetchGif } from '../context/actions/chatActions';
import Message from './Message';

const ChatWindow = () => {
  const chatState = useContext(ChatState);
  const userState = useContext(UserState);
  const chatDispatch = useContext(ChatDispatch);
  const { socket, username } = userState;
  const { messages, avatar } = chatState;
  const [messageInput, setMessageInput] = useState('');

  console.log("MESSAGES", messages)

  useEffect(() => {
    console.log("use effect running", socket)
    if (socket) {
      socket.on('user-connected', username => {
        console.log("USER CONNECTED IN CHAT WINDOW")
      })
      socket.on('message', message => {
        console.log("MESSAGE EVENT RECEIVED IN CHAT WINDOW", message);
        setMessage(message);
      });
    }
  });

  const handleMessageSubmit = async message => {
    setMessageInput('');
    if (message.includes('/gif')) {
      const query = message.split(' ')[1];
      try {
        const response = await fetchGif(query);
        if (response.data && response.data.data && response.data.data.length) {
          socket.emit('image-message', {
            url: response.data.data[0].url,
            alt: response.data.data[0].title,
          });
        }
        console.log("EMITTING IMAGE MESSAGE", {
          url: response.data.data[0].url,
          alt: response.data.data[0].title,
        });
      } catch(err) {
        const message = err.message || 'Cannot fetch Gif';
        console.error(message, err, err.stack);
      }
    } else {
      socket.emit('text-message', message);
      console.log("EMITTING TEXT MESSAGE", message);
    }
  }

  return (
    socket ? 
    <div className="chat-container">
    <p>CHATS</p>
      <div className="messages">
        {messages.map((message, index) => {
            return (
              <div className="message-container" key={index}>
                <Message message={message} username={avatar}/>
              </div>
            )
          })}
      </div>
      <div className="chat-input">
          <form>
            <input
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
            >
            </input>
            <button onClick={(e) => {
                e.preventDefault();
                handleMessageSubmit(messageInput);
              }}>Send</button>
          </form>
      </div>
    </div>
    : null
  );
}

export default ChatWindow;