import React, { useEffect } from 'react';

const Message = (props) => {
  const { message, username } = props;
  const { type  } = message;
  const date = new Date(message.time);
  const time = date.toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });
  return (
    <div className="message-container">
      <div className="avatar-container">
        <img className="avatar" src={`https://ui-avatars.com/api/?name=${username}&background=EEEEEE&color=000`}/>
      </div>
      <div className="message-contents">
        <div className="message-header">
          <p className="username">{username}</p>
          <p className="time">{time}</p>
        </div>
      </div>
      {
        (type === 'text') ?
          <div className="message-text">
            <p>{message.text}</p>
          </div>
          :
          <div className="message-image">
            <img className="gif" src={message.url} alt={message.alt}/>
          </div>
      }
    </div>
  )
}

export default Message;