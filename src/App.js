import React from 'react';
import { UserProvider, ChatProvider } from './context';
import LoginCard from './components/LoginCard';
import ChatWindow from './components/ChatWindow';

function App() {
  return (
    <UserProvider>
      <ChatProvider>
        <div className="container">
          <LoginCard/>
          {/* <ChatWindow/> */}
        </div>
      </ChatProvider>
    </UserProvider>
  );
}

export default App;
