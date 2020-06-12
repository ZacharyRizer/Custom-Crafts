import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Context } from '../Context';
import { Frame, Heading, Button, Table, Line } from 'arwes';
import Axios from 'axios';
import { useAuth0 } from '../react-auth0-spa';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

// const ADD_ORDER = gql`



const OrderSummary = () => {
  let { cartItems, setCartItems, setNumItems } = useContext(Context);
  let [subtotal, setSubtotal] = useState(0);
  const history = useHistory();
  const { getTokenSilently } = useAuth0();

  const handleCheckout = async (e) => {
    if (!cartItems || cartItems.length === 0) return;

    const user = JSON.parse(localStorage.getItem('custom_crafts_userObj'));
    const token = await getTokenSilently();

    // serialize cartItems
    const orderItemsCart = cartItems.map(item => (JSON.stringify({ shipId: parseInt(item.id), quantity: item.quantity })))
    // const orderItemsCart = cartItems.map(item => (
    // { "\\\"shipId\"": `${parseInt(item.id)}`, "\\\"quantity\"": `${parseInt(item.quantity)}` }
    //   `\\`
    // ));
    console.log('orderItemCart 27!!!!!!', orderItemsCart);

    let jsonCart = JSON.stringify(orderItemsCart);
    jsonCart = jsonCart.replace(/"{/g, "{");
    jsonCart = jsonCart.replace(/}"/g, "}");
    console.log((jsonCart))

    // order creation query string
    let os = `
      mutation addOrder($customerId: Int!) {
        addOrder (cart: {customerId: $customerId, items: "${jsonCart}"}){
          id
        }
      }
    `;

    console.log('os', os)




    // post order to db
    const res = await Axios({
      url: 'http://localhost:5000/graphql',
      headers: {
        Authorization: `Bearer ${token}`
      },
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

    console.log('cart items 67', cartItems);
    // cartItems.forEach(async (item) => {
    //   const res = await Axios({
    //     url: 'http://localhost:5000/graphql',
    //     headers: {
    //       Authorization: `Bearer ${token}`
    //     },
    //     method: 'post',
    //     data: {
    //       query: is,
    //       variables: {
    //         orderId: order.id,
    //         shipId: item.id,
    //         quantity: item.quantity,
    //       },
    //     },
    //   });
    //   console.log('res 80: ', res)


    //   // Update db to reduce ship stock based on associated order-item post

    //   const stockRes = await Axios({
    //     url: 'http://localhost:5000/graphql',
    //     headers: {
    //       Authorization: `Bearer ${token}`
    //     },
    //     method: 'post',
    //     data: {
    //       query: ss,
    //       variables: {
    //         id: item.id,
    //         decQuantity: item.quantity,
    //       },
    //     },
    //   });
    // });
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
