import React from 'react';
import { Row, Col } from 'arwes';
import Sidebar from './Sidebar';
import ShipList from './ShipList';

const Shop = () => {
  return (
    <Row>
      <Col style={{ paddingRight: 0, paddingLeft: 20 }} s={6} m={3}>
        <Sidebar />
      </Col>
      <Col s={6} m={9}>
        <ShipList />
      </Col>
    </Row>
  );
};

export default Shop;
