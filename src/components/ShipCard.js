import React from "react";
import { Frame, Line, Content, Button, Animation } from "arwes";

const ShipCard = (props) => (
  <Frame layer={"primary"} animate level={0} corners={4} style={{ marginBottom: 20 }}>
    <model-viewer
      style={{ backgroundColor: "black", height: "400px", width: "100%", margin: "auto" }}
      src={props.ship}
      alt="A 3D model of a spaceship"
      auto-rotate
      camera-controls
      interaction-prompt="none"
    ></model-viewer>
    <Line animate />
    <Content style={{ margin: "20px" }}>
      <h1>Test Ship Craft</h1>
      <blockquote data-layer="disabled">Manufacturure: Test Manu</blockquote>
      <blockquote data-layer="disabled">Craft Type: Test</blockquote>
      <Button animate>Buy Now</Button>
    </Content>
  </Frame>
);

export default ShipCard;
