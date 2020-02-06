import React, { useContext, useState } from 'react';
import { setUsernameToState, setIsLoggedIn } from '../context/actions/userActions';
import { UserDispatch, UserState } from '../context';


const LoginCard = () => {
  const dispatch = useContext(UserDispatch);
  const state = useContext(UserState);
  const [username, setUsername] = useState('');

  return (
    !state.isLoggedIn ? 
      <div className="login-card-container">
        <div className="title-container">
          <h1 className="title">Join chat</h1>
        </div>
        <form className="login-form">
          <label className="login-input-label" htmlFor="login">Please enter your username</label>
          <input 
            type="text" 
            className="login-input" 
            id="login"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button 
            className="login-next-button"
            onClick={(e) => {
              e.preventDefault();
              if (username.length) {
                setUsernameToState(username, dispatch);
                setIsLoggedIn(true, dispatch);
              }
            }}
          >
            Next
          </button>
        </form>
      </div>
    : null
  );
};

export default LoginCard;