import React from "react";
import { Frame, Heading, Header, Button } from "arwes";
import { Link } from "react-router-dom";

//render custom 404 component

const FourOhFour = () => {
  return (
    <>
      <div style={{ padding: 20 }}>
        <Header animate style={{ backgroundColor: "transparent" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Heading style={{ margin: "0 0 0 10px", fontSize: "32px" }}>404 - Coordinates Not Found</Heading>
            <Link style={{ paddingRight: 10 }} to="/shop">
              <Button animate layer="secondary">
                Warp Back to the Shop
              </Button>
            </Link>
          </div>
        </Header>
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
            src="/spaceships/qm.glb"
            alt="A 3D model of a spaceship"
            auto-rotate
            auto-rotate-delay={0}
            camera-controls
            exposure={0.75}
            interaction-prompt="none"
          ></model-viewer>
        </Frame>
      </div>
    </>
  );
};

export default FourOhFour;
