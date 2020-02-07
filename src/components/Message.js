import React from 'react';

const Message = (props) => {
  const { message, username } = props;
  const { type } = message;
  const time = message.time.toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });
  return (
    type === 'text' ?
    <div className="text message-container">
      <div className="avatar-container">
        <img className="avatar" src={`https://ui-avatars.com/api/?name=${username}&background=EEEEEE&color=fff`}/>
      </div>
      <div className="message-contents">
        <div className="message-header">
          <p className="username">{username}</p>
          <p className="time">{time}</p>
        </div>
        <div className="message-text">
          <p>{message.text}</p>
        </div>
      </div>
    </div>
    : null
  )
}

export default Message;