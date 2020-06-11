import React from "react";
import { Row, Col } from "arwes";
import Sidebar from "./Sidebar";
import ShipList from "./ShipList";
import Sidebar2 from "./Sidebar2";

const Shop = () => {
  return (
    <Row>
      <Col s={6} m={3}>
        <Sidebar2 />
      </Col>
      <Col s={6} m={9}>
        <ShipList />
      </Col>
    </Row>
  );
};

export default Shop;
