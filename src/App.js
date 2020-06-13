import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { ContextProvider } from "./Context";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

import Admin from "./components/Admin";
import AdminRoute from "./components/AdminRoute";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import FoF from "./components/FourOhFour";
import NavBar from "./components/NavBar";
import PrivateRoute from "./components/PrivateRoute";
import Profile from "./components/Profile";
import ShipPage from "./components/ShipPage";
import Shop from "./components/Shop";
import Splash from "./components/Splash";

const App = () => {
  const client = new ApolloClient({ uri: "http://localhost:5000/graphql" });

  return (
    <ApolloProvider client={client}>
      <ContextProvider>
        <>
          <div style={{ position: "fixed", width: "100%", "z-index": "100" }}>
            <NavBar />
          </div>
          <div style={{ marginTop: 120 }}>
            <Switch>
              <Route exact path="/" component={Splash} />
              <Route exact path="/shop" component={Shop} />
              <Route exact path="/ships/:shipId" render={(props) => <ShipPage {...props} />} />
              <Route exact path="/cart" component={Cart} />
              <PrivateRoute exact path="/checkout" component={Checkout} />
              <PrivateRoute exact path="/profile" component={Profile} />
              <AdminRoute exact path="/admin" component={Admin} />
              <Route component={FoF} />
            </Switch>
          </div>
        </>
      </ContextProvider>
    </ApolloProvider>
  );
};

export default App;
