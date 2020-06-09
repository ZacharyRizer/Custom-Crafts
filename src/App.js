import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ContextProvider } from './Context';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import ShipPage from './components/ShipPage';
import NavBar from './components/NavBar';
import Splash from './components/Splash';
import Shop from './components/Shop';
import PrivateRoute from './components/PrivateRoute';
import Profile from './components/Profile';

const App = () => {
  const client = new ApolloClient({ uri: "http://localhost:5000/graphql" });

  return (
    <ApolloProvider client={client}>
      <ContextProvider>
        <>
          <NavBar />
          <Switch>
            <Route exact path="/" component={Splash} />
            <Route path="/shop" component={Shop} />
            <Route path="/ships/:shipId" component={ShipPage} />
            <PrivateRoute path="/profile" component={Profile} />
          </Switch>
        </>
      </ContextProvider>
    </ApolloProvider>
  );
};

export default App;
