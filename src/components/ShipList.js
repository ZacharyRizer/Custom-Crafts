import React from "react";
import ShipCard from "./ShipCard";
import { Row, Col } from "arwes";

const ShipList = () => (
  <Row>
    <Col s={12} xl={3}>
      <ShipCard ship="/spaceships/test_ship.glb" />
    </Col>
    <Col s={12} xl={3}>
      <ShipCard ship="/spaceships/test_ship.glb" />
    </Col>
    <Col s={12} xl={3}>
      <ShipCard ship="/spaceships/test_ship.glb" />
    </Col>
    <Col s={12} xl={3}>
      <ShipCard ship="/spaceships/test_ship.glb" />
    </Col>
  </Row>
);

export default ShipList;
