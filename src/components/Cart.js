import React, { useState, useContext } from 'react';
import { Context } from '../Context';
import { Link } from 'react-router-dom';
import { Frame, Heading, Button, Table, Line } from 'arwes';


const Cart = () => {

    let [quantity, setQuantity] = useState(1);

    // const increment = () => {

    // }

    // const decrement = () => {

    // }
    
    const { cartItems } = useContext(Context);

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
          <Link to='/checkout'><Button animate layer='secondary'>Proceed to Checkout</Button></Link>
        </Frame>
      </>
    )
};
export default Cart;