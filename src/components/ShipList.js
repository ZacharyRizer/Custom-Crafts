import React from "react";
import ShipCard from "./ShipCard";
import { Row, Col } from "arwes";

const ShipList = () => (
  <>
    <Row>
      <Col s={6} xl={3}>
        <ShipCard stock={6} ship="/spaceships/test_ship.glb" />
      </Col>
      <Col s={6} xl={3}>
        <ShipCard stock={5} ship="/spaceships/test_ship.glb" />
      </Col>
      <Col s={6} xl={3}>
        <ShipCard stock={2} ship="/spaceships/test_ship.glb" />
      </Col>
      <Col s={6} xl={3}>
        <ShipCard stock={2} ship="/spaceships/test_ship.glb" />
      </Col>
    </Row>
  </>
);

export default ShipList;
