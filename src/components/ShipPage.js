import React, { useState } from "react";
import { Frame, Content, Heading, Header, Row, Col, Button } from "arwes";

const ShipPage = () => {
  const [price, setPrice] = useState(10000);
  const [used, setUsed] = useState(false);
  const [ftl, setFtl] = useState(false);
  const [stock, setStock] = useState(3);
  const [name, setName] = useState("Ship Name Here");
  const [designer, setDesigner] = useState("Your Name Here");
  const [craftType, setCraftType] = useState("Performance");
  const [manufacturer, setManufacturer] = useState("Corellian Engineering Corporation");
  const [size, setSize] = useState(1000);
  const [capacity, setCapacity] = useState(100);
  const [range, setRange] = useState(2);
  const [description, setDescription] = useState(
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sit amet mattis vulputate enim. Malesuada proin libero nunc consequat interdum varius."
  );

  return (
    <>
      <div style={{ padding: 20 }}>
        <Header animate style={{ backgroundColor: "transparent" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Heading style={{ margin: "0 0 0 10px", fontSize: "32px" }}>{name}</Heading>
            {stock > 0 ? (
              <Button layer="secondary" style={{ marginRight: 10 }}>
                Add to Cart
              </Button>
            ) : (
              <Button layer="disabled" style={{ marginRight: 10, pointerEvents: "none" }}>
                Out of Stock
              </Button>
            )}
          </div>
        </Header>
        <Content>
          <Row>
            <Col s={6}>
              <Frame layer={"primary"} animate level={0} corners={4} style={{ margin: 20 }}>
                <div style={{ display: "flex", justifyContent: "center", margin: "20px" }}>
                  <blockquote style={{ margin: "0 0 0 0" }}>${price}</blockquote>
                  {used ? (
                    <blockquote data-layer="alert" style={{ margin: "0 0 0 20px" }}>
                      Used
                    </blockquote>
                  ) : (
                    <blockquote data-layer="success" style={{ margin: "0 0 0 20px" }}>
                      New
                    </blockquote>
                  )}
                  {ftl ? (
                    <blockquote data-layer="success" style={{ margin: "0 0 0 20px" }}>
                      FTL Drive Included
                    </blockquote>
                  ) : (
                    <blockquote data-layer="alert" style={{ margin: "0 0 0 20px" }}>
                      No FTL Drive
                    </blockquote>
                  )}
                  {stock > 5 ? (
                    <blockquote data-layer="" style={{ margin: "0 0 0 20px" }}>
                      Stock: {stock}
                    </blockquote>
                  ) : stock > 0 ? (
                    <blockquote data-layer="alert" style={{ margin: "0 0 0 20px" }}>
                      Stock: {stock}
                    </blockquote>
                  ) : (
                    <blockquote data-layer="disabled" style={{ margin: "0 0 0 20px" }}>
                      Stock: {stock}
                    </blockquote>
                  )}
                  <blockquote data-layer="disabled" style={{ margin: "0 0 0 20px" }}>
                    Designed by: {designer}
                  </blockquote>
                </div>
              </Frame>
              <Frame layer={"primary"} animate level={0} corners={4} style={{ margin: 20 }}>
                <div style={{ padding: "20px" }}>
                  <p style={{ display: "inline" }}>Craft Type:</p>
                  <blockquote>{craftType}</blockquote>
                  <p style={{ display: "inline" }}>Manufacturer:</p>
                  <blockquote>{manufacturer}</blockquote>
                  <p style={{ display: "inline" }}>Ship Size:</p>
                  <blockquote>{size} Meters</blockquote>
                  <p style={{ display: "inline" }}>Crew Capacity:</p>
                  <blockquote>{capacity}</blockquote>
                  <p style={{ display: "inline" }}>Travel Range:</p>
                  <blockquote>{range} Parsec(s)</blockquote>
                </div>
              </Frame>
            </Col>
            <Col s={6}>
              <Frame layer={"primary"} animate level={0} corners={4} style={{ margin: 20 }}>
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
                  src="/spaceships/test_ship.glb"
                  alt="A 3D model of a spaceship"
                  auto-rotate
                  camera-controls
                  camera-orbit="0deg 90deg 75%"
                  interaction-prompt="none"
                ></model-viewer>
              </Frame>
              <Frame layer={"primary"} animate level={0} corners={4} style={{ margin: 20 }}>
                <div style={{ padding: "20px" }}>
                  <p style={{ margin: 0 }}>{description}</p>
                </div>
              </Frame>
            </Col>
          </Row>
        </Content>
      </div>
    </>
  );
};

export default ShipPage;
