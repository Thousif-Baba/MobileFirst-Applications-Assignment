import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LoginPage from './components/LoginPage/index';
import Homepage from './components/HomePage/index';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  const handleLogin = (user) => {
    setUsername(user);
    setLoggedIn(true);
  };

  const handleLogout = () => {
    setUsername('');
    setLoggedIn(false);
  };

  return (
    <BrowserRouter>
      <div>
        <Switch>
          <Route path="/" exact>
            {!loggedIn ? (
              <LoginPage onLogin={handleLogin} />
            ) : (
              <Homepage username={username} onLogout={handleLogout} />
            )}
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
