import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../Context';
import { Frame, Heading, Button, Table, Line } from 'arwes';

import Axios from 'axios';


const Cart = () => {
  let { cartItems, setCartItems, numItems, setNumItems } = useContext(Context);
  let [subtotal, setSubtotal] = useState(0);

  let [quantity, setQuantity] = useState(1);
  console.log(`cartItems: `, cartItems)

  const handleCheckout = async () => {
    // const user = await auth0FromHook.getUser();
    // const token = await auth0FromHook.getTokenSilently();

    const user = JSON.parse(localStorage.getItem('custom_crafts_userObj'));
    console.log('user in checkout: ', user)
    // order creation query string

    let os = `
      mutation addOrder($customerId: Int!) {
        addOrder(customerId: $customerId){
          customerId
          id
        }
      }
    `

    // post order to db

    const res = await Axios({
      url: 'http://localhost:5000/graphql',
      method: 'post',
      data: {
        query: os,
        variables: { customerId: user.id }
      }
    });

    const order = res.data.data.addOrder;
    console.log('order data: ', order);


    //   // add isAuthenticated logic ???

    // create order items

    let is = `
        mutation addOrderItem($orderId: Int!, $shipId: Int!, $quantity: Int!){
          addOrderItem(orderId: $orderId, shipId: $shipId, quantity: $quantity){
            id
          }
        }
      `

    cartItems.forEach(async (item) => {
      const res = await Axios({
        url: 'http://localhost:5000/graphql',
        method: 'post',
        data: {
          query: is,
          variables: { orderId: order.id, shipId: item.id, quantity: item.quantity }
        }
      });
    })
  }

  let entries = cartItems.map(item => {

    return (
      [item.name, item.category.name, <><Button onClick={() => setQuantity(quantity += 1)} animate layer='success' buttonProps={{ style: { padding: 5 } }}>+</Button><span style={{ padding: "10px", width: "50px" }}>{item.quantity}</span><Button onClick={() => setQuantity(quantity -= 1)} animate layer='alert' buttonProps={{ style: { padding: 5 } }}>-</Button></>, 'red', item.price, <><Link to='/shop'><Button animate layer='primary' style={{ marginRight: 10 }} buttonProps={{ style: { padding: 5, fontSize: 10 } }}>Edit</Button></Link> <Button animate layer='alert' buttonProps={{ style: { padding: 5, fontSize: 10 } }}>Remove</Button></>]
    )
  })
  useEffect(() => {
    if (localStorage.getItem('cart')) {//save to variable?
      let cart = JSON.parse(localStorage.getItem('cart'));
      setCartItems(cart);
    }
    let total = cartItems.reduce((accum, item) => {
      return accum + item.quantity * item.price;
    }, 0);
    setSubtotal(total);
  }, [numItems]);

  const increment = (e) => {
    let id = e.target.id;
    let newCart = [...cartItems];
    newCart.forEach((item) => {
      if (item.id === id && item.quantity < item.stock) {
        item.quantity = item.quantity + 1;
        setNumItems((numItems += 1));
      }
    });
    localStorage.setItem('itemNum', JSON.stringify(numItems));
    setCartItems(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  const decrement = (e) => {
    let id = e.target.id;
    let newCart = [...cartItems];
    newCart.forEach((item) => {
      if (item.id === id && item.quantity > 1) {
        item.quantity = item.quantity - 1;
        setNumItems((numItems -= 1));
      }
    });
    localStorage.setItem('itemNum', JSON.stringify(numItems));
    setCartItems(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  const removeItem = (e) => {
    let id = e.target.id;
    let itemToRemove = cartItems.find((item) => item.id === id);
    let numToRemove = itemToRemove.quantity;
    setNumItems((numItems -= numToRemove));
    localStorage.setItem('itemNum', JSON.stringify(numItems));

    let newCart = cartItems.filter((item) => item.id !== id);
    setCartItems(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  entries = cartItems.map((item) => {
    return [
      <Link
        to={`/ships/${item.id}`}
        style={{
          textDecoration: 'none',
          color: '#26dafd',
        }}>
        {item.name}
      </Link>,
      item.category.name,
      item.manufacturer.name,
      <>
        <Button
          animate
          layer="success"
          buttonProps={{ style: { padding: 5 }, id: `${item.id}` }}
          onClick={increment}>
          +
        </Button>
        <span style={{ padding: '10px', width: '50px' }}>{item.quantity}</span>
        <Button
          animate
          layer="alert"
          buttonProps={{ style: { padding: 5 }, id: `${item.id}` }}
          onClick={decrement}>
          -
        </Button>
      </>,
      item.price,
      <Button
        animate
        layer="alert"
        buttonProps={{ style: { padding: 5, fontSize: 15 }, id: `${item.id}` }}
        onClick={removeItem}>
        Remove
      </Button>,
    ];
  });

  return (
    <>
      <Frame style={{ padding: 20 }} animate corners={4}>
        <Heading>Shopping Cart</Heading>
        <div style={{ padding: 20 }}>
          <Table
            headers={[
              'Product Name',
              'Type',
              'Manufactuer',
              'Quantity',
              'Price',
              'Modify',
            ]}
            dataset={entries}
          />
        </div>
        <Line animate layer="success" />
        <Heading node="h4">Subtotal : {subtotal}</Heading>
        <Link to="/shop">
          <Button animate layer="success" style={{ marginRight: 25 }}>
            Continue Shopping
          </Button>
        </Link>
        <Link to="/checkout">
          <Button onClick={handleCheckout} animate layer="secondary">
            Proceed to Checkout
          </Button>
        </Link>
      </Frame>
    </>
  );
};
export default Cart;
