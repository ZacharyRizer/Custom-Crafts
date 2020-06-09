import React, { useState } from "react";
import { Frame, Line, Content, Appear, Button, withStyles, Footer } from "arwes";

const ShipCard = (props) => {
  return (
    <Frame layer={"primary"} animate level={0} corners={4} style={{ marginBottom: 20 }}>
      <model-viewer
        style={{
          backgroundColor: "transparent",
          height: "400px",
          width: "100%",
          margin: "auto",
          "--poster-color": "transparent",
          "--progress-bar-color": "transparent",
          "--progress-mask": "transparent",
        }}
        src={props.ship}
        alt="A 3D model of a spaceship"
        auto-rotate
        camera-controls
        interaction-prompt="none"
      ></model-viewer>
      <Line animate />
      <Content style={{ margin: "20px" }}>
        <Appear animate>
          <div>
            <h1>ISV Rimward Gold</h1>
          </div>
          <p style={{ display: "inline" }}>Manufacturer:</p>
          <blockquote> Corellian Engineering Corporation</blockquote>
          <p style={{ display: "inline" }}>Craft Type:</p>
          <blockquote>Performance</blockquote>
        </Appear>
      </Content>
      <Line animate />
      <div style={{ display: "flex", justifyContent: "space-around", margin: "0px 20px 20px 20px" }}>
        <Button corners={0} level={3} style={{ pointerEvents: "none" }} layer="primary">
          $1000
        </Button>
        {props.stock > 5 ? (
          <Button corners={0} style={{ pointerEvents: "none" }} layer="success">
            In Stock
          </Button>
        ) : props.stock > 2 ? (
          <Button corners={0} style={{ pointerEvents: "none" }} layer="alert">
            Limited Stock
          </Button>
        ) : (
          <Button corners={0} style={{ pointerEvents: "none" }} layer="disabled">
            Out of Stock
          </Button>
        )}
        <Button layer="secondary">View Details</Button>
      </div>
    </Frame>
  );
};

export default ShipCard;
