import React from "react";
import ShipCard from "./ShipCard";
import { Row, Col } from "arwes";

const ShipList = () => (
  <>
    <Row>
      <Col s={12} xl={4}>
        <ShipCard
          stock={6}
          name="ISV Rimward Gold"
          type="Performance"
          manufacturer="Corellian Engineering Corporation"
          price={100000}
          link="/"
          ship="/spaceships/test_ship.glb"
        />
      </Col>
      <Col s={12} xl={4}>
        <ShipCard
          stock={5}
          name="ISV Rimward Gold"
          type="Performance"
          manufacturer="Corellian Engineering Corporation"
          price={100000}
          link="/"
          ship="/spaceships/test_ship.glb"
        />
      </Col>
      <Col s={12} xl={4}>
        <ShipCard
          stock={0}
          name="ISV Rimward Gold"
          type="Performance"
          manufacturer="Corellian Engineering Corporation"
          price={100000}
          link="/"
          ship="/spaceships/test_ship.glb"
        />
      </Col>
    </Row>
  </>
);

export default ShipList;
