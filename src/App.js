import React from 'react';
import { Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import MainPage from './components/MainPage';
import Callback from './Callback'; // where Auth0 returns to after login

function App() {
  return (
    <div className="App">
      <NavBar />
      <MainPage />
      <Route exact path="/callback" component={Callback} />
    </div>
  );
}

export default App;
