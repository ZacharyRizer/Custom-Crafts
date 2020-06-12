import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../Context';
import { Frame, Heading, Button, Table, Line } from 'arwes';

const Cart = () => {
  let { cartItems, setCartItems, numItems, setNumItems } = useContext(Context);
  let [subtotal, setSubtotal] = useState(0);

  useEffect(() => {
    if (localStorage.getItem('cart')) {
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

  let entries = cartItems.map((item) => {
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
          <Button animate layer="secondary">
            Checkout
          </Button>
        </Link>
      </Frame>
    </>
  );
};

export default Cart;
