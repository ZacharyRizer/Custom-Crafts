import React from 'react';
import { Row, Col } from 'arwes';
import Sidebar from './Sidebar';
import ShipList from './ShipList';

const Shop = () => {
  return (
    <Row>
      <Col s={3}>
        <Sidebar />
      </Col>
      <Col s={9}>
        <ShipList />
      </Col>
    </Row>
  );
};

export default Shop;
