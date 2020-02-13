import React from 'react';
import './Message.css';

const Message = (props) => {
  const { message, username } = props;
  const { type, text, time, url, alt } = message;
  return (
    <div className="message-container">
      <div className="avatar-container">
        <img className="avatar" alt='user avatar' src={`https://ui-avatars.com/api/?name=${username}&background=EEEEEE&color=000`}/>
      </div>
      <div className="message-contents">
        <div className="message-header">
          <p className="username">{username}</p>
          <p className="time">{time}</p>
        </div>
        {
          (type === 'text') ?
            <div className="message">
              {
                (Array.isArray(text)) ?
                  text.map((msg, index) => {
                    return <p key={index} className="message-text">{msg}</p>
                  })
                  :
                  <p className="message-text">{text}</p>
              }
            </div>
            :
            <div className="message">
                <img className="gif" src={url} alt={alt}/>
            </div>
        }
      </div>
    </div>
  )
}

export default Message;