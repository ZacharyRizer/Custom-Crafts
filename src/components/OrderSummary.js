import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../Context';
import { Frame, Heading, Button, Table, Line } from 'arwes';

const OrderSummary = (props) => {
  let { cartItems, setCartItems } = useContext(Context);
  let [subtotal, setSubtotal] = useState(0);

  useEffect(() => {
    let cart = JSON.parse(localStorage.getItem('cart'));
    setCartItems(cart);
    let total = cart.reduce((accum, item) => {
      return accum + item.quantity * item.price;
    }, 0);
    setSubtotal(total);
  }, []);

  let entries = cartItems.map((item) => {
    return [item.name, item.quantity, item.price];
  });

  return (
    <div>
      <Frame style={{ width: 400, height: 500 }}>
        <Heading node="h4">ORDER SUMMARY</Heading>
        <div style={{ padding: 20 }}>
          <Table headers={['ITEM', 'QTY', 'PRICE']} dataset={entries} />
          <Line animate layer="success" />
          <Link to="/cart">
            <Button
              animate
              layer="secondary"
              buttonProps={{ style: { padding: 5, fontSize: 10 } }}>
              CHANGE YOUR ORDER
            </Button>
          </Link>
          <Line animate layer="secondary" />
          <Heading node="h5">ORDER TOTAL : {subtotal}</Heading>
          <Link to="/shop">
            <Button
              animate
              layer="secondary"
              buttonProps={{ style: { padding: 5, fontSize: 10 } }}>
              Confirm Order
            </Button>
          </Link>
        </div>
      </Frame>
    </div>
  );
};

export default OrderSummary;
