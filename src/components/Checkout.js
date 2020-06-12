import React from 'react';
import { Row, Col } from 'arwes';
import OrderSummary from './OrderSummary';
import ShipsInCart from './ShipsInCart';

const Checkout = (props) => {
  return (
    <Row>
      <Col style={{ paddingRight: 0, paddingLeft: 20 }} s={6} m={3}>
        <OrderSummary />
      </Col>
      <Col s={6} m={9}>
        <ShipsInCart />
      </Col>
    </Row>
  );
};

export default Checkout;
