import React, { useState, useContext } from 'react';
import { Context } from '../Context';
import { Link } from 'react-router-dom';
import { Frame, Heading, Button, Table, Line } from 'arwes';



const Cart = () => {

    let [quantity, setQuantity] = useState(1);
    const { cartItems } = useContext(Context);

    // const increment = () => {

    // }

    // const decrement = () => {

    // }

    const handleCheckout = async () => {
        let modal = document.getElementById('modal');
        modal.style.display = 'block';
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
                <Button onClick={handleCheckout} animate layer='secondary'>Checkout</Button>
                <div id='modal'>
                  <div id='modal-content'>
                    <Frame style={{width:350, height:350}}>
                      <Heading node='h4'>ORDER SUMMARY</Heading>
                      <div style={{padding:20}}>
                        <Table headers={['ITEM', 'QTY', 'PRICE']} dataset={entries} />
                        <Line animate layer='success' />
                        <Button animate layer='secondary' buttonProps={{ style: { padding: 5, fontSize: 10 } }}>CHANGE YOUR ORDER</Button>
                        <p style={{fontSize:12}}>Standard Shipping:</p>
                        <p style={{ fontSize: 12 }}>Universe Taxes:</p>
                        <Line animate layer='secondary' />
                        <Heading node='h5'>ORDER TOTAL :</Heading>
                      </div>
                    </Frame>
                  </div>
                </div>
        </Frame>
      </>
    )
};

export default Cart;