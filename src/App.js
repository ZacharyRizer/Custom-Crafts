import React from "react";
import { Route } from "react-router-dom";
import Splash from "./components/Splash";
import ShipList from "./components/ShipList";

function App() {
  return (
    <>
      <Route exact path="/" component={Splash} />
      <Route path="/ships" component={ShipList} />
    </>
  );
}

export default App;
