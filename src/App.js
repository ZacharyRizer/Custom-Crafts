import React from "react";
import { Route, Switch } from "react-router-dom";
import { ContextProvider } from "./Context";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { Logo } from "arwes";

import Splash from "./components/Splash";
import NavBar from "./components/NavBar";
import PrivateRoute from "./components/PrivateRoute";
import ExternalApi from "./components/ExternalApi";
import Profile from "./components/Profile";
import ShipPage from "./components/ShipPage";
import Shop from "./components/Shop";

const App = () => {
  const client = new ApolloClient({ uri: "http://localhost:5000/graphql" });

  return (
    <ApolloProvider client={client}>
      <ContextProvider>
        <>
          <header>
            <NavBar />
            <ExternalApi />
            {/* <Logo className="logo" animate size={100} /> */}
          </header>
          <Switch>
            <Route exact path="/" component={Splash} />
            <Route exact path="/ships" component={Shop} />
            <Route path="/ships/:shipId" component={ShipPage} />
            <PrivateRoute path="/profile" component={Profile} />
          </Switch>
        </>
      </ContextProvider>
    </ApolloProvider>
  );
};

export default App;
