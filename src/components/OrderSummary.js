import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Context } from '../Context';
import { Frame, Heading, Button, Table, Line } from 'arwes';
import Axios from 'axios';

const OrderSummary = () => {
  let { cartItems, setCartItems, setNumItems } = useContext(Context);
  let [subtotal, setSubtotal] = useState(0);
  const history = useHistory();

  const handleCheckout = async (e) => {
    if (!cartItems || cartItems.length === 0) return;

    const user = JSON.parse(localStorage.getItem('custom_crafts_userObj'));

    // order creation query string
    let os = `
      mutation addOrder($customerId: Int!) {
        addOrder(customerId: $customerId){
          customerId
          id
        }
      }
    `;

    // post order to db
    const res = await Axios({
      url: 'http://localhost:5000/graphql',
      method: 'post',
      data: {
        query: os,
        variables: { customerId: user.id },
      },
    });

    const order = res.data.data.addOrder;
    //   // add isAuthenticated logic ???

    // create order items
    let is = `
        mutation addOrderItem($orderId: Int!, $shipId: Int!, $quantity: Int!){
          addOrderItem(orderId: $orderId, shipId: $shipId, quantity: $quantity){
            id
          }
        }
      `;

    // create updateShip string

    let ss = `
        mutation($id: Int!, $decQuantity: Int!){
          decrementShipStock(id: $id, decQuantity: $decQuantity){
            id
            stock
          }
        }
    `;

    cartItems.forEach(async (item) => {
      const res = await Axios({
        url: 'http://localhost:5000/graphql',
        method: 'post',
        data: {
          query: is,
          variables: {
            orderId: order.id,
            shipId: item.id,
            quantity: item.quantity,
          },
        },
      });

      // Update db to reduce ship stock based on associated order-item post

      const stockRes = await Axios({
        url: 'http://localhost:5000/graphql',
        method: 'post',
        data: {
          query: ss,
          variables: {
            id: item.id,
            decQuantity: item.quantity,
          },
        },
      });
    });

    localStorage.removeItem('cart');
    localStorage.removeItem('itemNum');
    setNumItems(0);
    setCartItems([]);
    // use history to wait to redirect until post is complete
    history.push('/profile');
  };

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
              BACK TO CART
            </Button>
          </Link>
          {'  '}
          <Link to="/shop">
            <Button
              animate
              layer="secondary"
              buttonProps={{ style: { padding: 5, fontSize: 10 } }}>
              BACK TO SHOP
            </Button>
          </Link>
          <Line animate layer="secondary" />
          <Heading node="h5">ORDER TOTAL : {subtotal}</Heading>
          <Button
            animate
            layer="success"
            buttonProps={{ style: { padding: 5, fontSize: 15 } }}
            onClick={handleCheckout}>
            Confirm Order
          </Button>
        </div>
      </Frame>
    </div>
  );
};

export default OrderSummary;
