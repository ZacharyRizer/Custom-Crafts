import React from "react";
import Spaceship from "../spaceships/test_ship.glb";

const ShipList = () => (
  <model-viewer
    style={{ backgroundColor: "black", height: "400px", width: "50%" }}
    src={Spaceship}
    alt="A 3D model of a spaceship"
    auto-rotate
    camera-controls
  ></model-viewer>
);

export default ShipList;
