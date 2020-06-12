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
import Cart from './components/Cart';
import Checkout from './components/Checkout';

const App = () => {
  const client = new ApolloClient({ uri: 'http://localhost:5000/graphql' });

  return (
    <ApolloProvider client={client}>
      <ContextProvider>
        <>
          <div style={{ position: 'fixed', width: '100%', 'z-index': '100' }}>
            <NavBar />
          </div>
          <div style={{ marginTop: 120 }}>
            <Switch>
              <Route exact path="/" component={Splash} />
              <Route path="/shop" component={Shop} />
              <Route
                path="/ships/:shipId"
                render={(props) => <ShipPage {...props} />}
              />
              <Route path="/cart" component={Cart} />
              <PrivateRoute path="/checkout" component={Checkout} />
              <PrivateRoute path="/profile" component={Profile} />
            </Switch>
          </div>
        </>
      </ContextProvider>
    </ApolloProvider>
  );
};

export default App;
