import React from "react";
import { Frame, Line, Content, Appear, Button, withStyles, Footer } from "arwes";

const ShipCard = ({ ship: { id, stock, name, category, manufacturer, price, modelLink } }) => {

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
        src={modelLink}
        alt="A 3D model of a spaceship"
        auto-rotate
        camera-controls
        interaction-prompt="none"
      ></model-viewer>
      <Line animate />
      <Content style={{ margin: "20px" }}>
        <Appear animate>
          <div>
            <h1>{name}</h1>
          </div>
          <p style={{ display: "inline" }}>Craft Type:</p>
          <blockquote>{category}</blockquote>
          <p style={{ display: "inline" }}>Manufacturer:</p>
          <blockquote>{manufacturer}</blockquote>
        </Appear>
      </Content>
      <Line animate />
      <div style={{ display: "flex", justifyContent: "space-around", margin: "0px 20px 20px 20px" }}>
        <Button corners={0} level={3} style={{ pointerEvents: "none" }} layer="primary">
          {"$" + price}
        </Button>
        {stock > 5 ? (
          <Button corners={0} style={{ pointerEvents: "none" }} layer="success">
            In Stock
          </Button>
        ) : stock > 0 ? (
          <Button corners={0} style={{ pointerEvents: "none" }} layer="alert">
            Limited Stock
          </Button>
        ) : (
              <Button corners={0} style={{ pointerEvents: "none" }} layer="disabled">
                Out of Stock
              </Button>
            )}
        <Button onClick={() => (window.location.href = '/')} layer="secondary">
          View Details
        </Button>
      </div>
    </Frame>
  );
};

export default ShipCard;
