import React, { useContext, useState } from 'react';
import { getSocketConnection } from '../context/actions/userActions';
import { UserDispatch, UserState } from '../context';
import './styles/LoginCard.css';


const LoginCard = () => {
  const dispatch = useContext(UserDispatch);
  const state = useContext(UserState);
  const [username, setUsername] = useState('');

  return (
    !state.socket ? 
      <div className="card login-card-container">
        <div className="title-container">
          <h1 className="title">Join chat</h1>
        </div>
        <form className="login-form">
          <div className="login-label">
            <label className="login-input-label" htmlFor="login">Please enter your username</label>
          </div>
          <div className="login-input-container">
            <input 
                type="text" 
                className="login-input" 
                id="login"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          <div className="next-button-container">
            <button 
              className="login-next-button"
              onClick={(e) => {
                e.preventDefault();
                if (username.length) {
                  getSocketConnection(username, dispatch);
                }
              }}
            >
              Next
            </button>
          </div>
        </form>
      </div>
    : null
  );
};

export default LoginCard;