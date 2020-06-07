import React from 'react';
import NavBar from './components/NavBar';
import PrivateRoute from './components/PrivateRoute';
import ExternalApi from './components/ExternalApi';

import { Router, Route, Switch } from 'react-router-dom';
import Profile from './components/Profile';
import history from './utils/history';

function App() {
  return (
    <div className="App">
      {/* Don't forget to include the history module */}
      <Router history={history}>
        <header>
          <NavBar />
          <ExternalApi />
        </header>
        <Switch>
          <Route path="/" exact />
          <PrivateRoute path="/profile" component={Profile} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
