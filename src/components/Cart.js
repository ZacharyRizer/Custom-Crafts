import React, { useState, useContext } from 'react';
import { Context } from '../Context';
import { Link } from 'react-router-dom';
import { Frame, Heading, Button, Table, Line } from 'arwes';

import Axios from 'axios';


const Cart = () => {

  let [quantity, setQuantity] = useState(1);
  const { cartItems } = useContext(Context);
  console.log(`cartItems: `, cartItems)


  // const increment = () => {

  // }

  // const decrement = () => {

  // }


  const handleCheckout = async () => {
    // const user = await auth0FromHook.getUser();
    // const token = await auth0FromHook.getTokenSilently();

    // // order creation query string

    // let os =


    //   // add isAuthenticated logic ???
    //   cartItems.forEach((item => console.log('Im an item: ', item)))
  }

  let entries = cartItems.map(item => {

    return (
      [item.name, item.category.name, <><Button onClick={() => setQuantity(quantity += 1)} animate layer='success' buttonProps={{ style: { padding: 5 } }}>+</Button><span style={{ padding: "10px", width: "50px" }}>{item.quantity}</span><Button onClick={() => setQuantity(quantity -= 1)} animate layer='alert' buttonProps={{ style: { padding: 5 } }}>-</Button></>, 'red', item.price, <><Link to='/shop'><Button animate layer='primary' style={{ marginRight: 10 }} buttonProps={{ style: { padding: 5, fontSize: 10 } }}>Edit</Button></Link> <Button animate layer='alert' buttonProps={{ style: { padding: 5, fontSize: 10 } }}>Remove</Button></>]
    )
  })

  return (
    <>
      <Frame style={{ padding: 20 }} animate corners={4}>
        <Heading>Shopping Cart</Heading>
        <div style={{ padding: 20 }}>
          <Table
            headers={['Product Name', 'Type', 'Quantity', 'Color', 'Price', 'Modify']}
            dataset={entries} />
        </div>
        <Line animate layer='success' />
        <Heading node='h4'>Subtotal :</Heading>
        <Link to='/shop'><Button animate layer='success' style={{ marginRight: 25 }}>Continue Shopping</Button></Link>
        <Button onClick={handleCheckout} animate layer='secondary'>Proceed to Checkout</Button>
      </Frame>
    </>
  )
};
export default Cart;