import React from 'react';
import { Link } from 'react-router-dom';
import { Frame, Heading, Button, Table } from 'arwes';


const Cart = () => {
    
    return (
      <>
        <Frame style={{ padding: 20 }} animate corners={4}>
          <Heading>Shopping Cart</Heading>
          <div style={{ padding: 20 }}>
                <Table 
                headers={['Product Name', 'Type', 'Quantity', 'Color', 'Price', 'Modify']} 
                dataset={[
                    ['Frontier', 'Military', <><Button animate layer='success' buttonProps={{ style: { padding: 5 } }}>+</Button><input type='number' min='0' step='1' placeholder='0' style={{ width: "50px" }}></input><Button animate layer='alert' buttonProps={{ style: { padding: 5 } }}>-</Button></>, 'red', '47,000,000', <><Link to='/shop'><Button animate layer='primary' style={{ marginRight: 10 }}>Edit</Button></Link> <Button animate layer='alert'>Remove</Button></>]
                    ]} />
          </div>
                <Link to='/shop'><Button animate layer='success' style={{ marginRight: 25 }}>Continue Shopping</Button></Link>
          <Link to='/checkout'><Button animate layer='secondary'>Proceed to Checkout</Button></Link>
        </Frame>
      </>
    )
};
export default Cart;