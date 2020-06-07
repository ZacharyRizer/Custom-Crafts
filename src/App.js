import React from "react";
import Spaceship from "./Spaceships/test_ship.glb";

function App() {
  return (
    <model-viewer
      style={{ backgroundColor: "black", height: "400px", width: "100%" }}
      src={Spaceship}
      alt="A 3D model of an astronaut"
      auto-rotate
      camera-controls
    ></model-viewer>
  );
}

export default App;
