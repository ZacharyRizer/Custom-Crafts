import React, { useContext, useEffect, useState } from 'react';
import { Link as Linky } from 'react-router-dom';
import { Context } from '../Context';
import { Frame, Heading, Button, Table, Header, Content, Link } from 'arwes';

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
    const id = e.target.id.split('_')[0];
    const color = e.target.id.split('_')[1];

    const totalQuantity = cartItems.reduce((accum, item) => {
      if (item.id === id) {
        return accum + item.quantity;
      }
      return accum;
    }, 0);

    let newCart = [...cartItems];
    newCart.forEach((item) => {
      if (
        item.id === id &&
        item.color === color &&
        totalQuantity < item.stock
      ) {
        item.quantity = item.quantity + 1;
        setNumItems((numItems += 1));
      }
    });
    localStorage.setItem('itemNum', JSON.stringify(numItems));
    setCartItems(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  const decrement = (e) => {
    const id = e.target.id.split('_')[0];
    const color = e.target.id.split('_')[1];

    let newCart = [...cartItems];
    newCart.forEach((item) => {
      if (item.id === id && item.color === color && item.quantity > 1) {
        item.quantity = item.quantity - 1;
        setNumItems((numItems -= 1));
      }
    });
    localStorage.setItem('itemNum', JSON.stringify(numItems));
    setCartItems(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  const removeItem = (e) => {
    const id = e.target.id.split('_')[0];
    const color = e.target.id.split('_')[1];

    const itemToRemove = cartItems.find(
      (item) => item.id === id && item.color === color
    );
    let numToRemove = itemToRemove.quantity;
    setNumItems((numItems -= numToRemove));
    localStorage.setItem('itemNum', JSON.stringify(numItems));

    let newCart = cartItems.filter(
      (item) => !(item.id === id && item.color === color)
    );
    setCartItems(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  let entries = cartItems.map((item) => {
    return [
      <Linky
        to={`/ships/${item.id}`}
        style={{
          textDecoration: 'none',
          color: '#26dafd',
        }}>
        <Link>{item.name}</Link>
      </Linky>,
      item.category.name,
      item.manufacturer.name,
      <p style={{ textTransform: 'capitalize' }}>{item.color}</p>,
      <>
        <Button
          animate
          layer="primary"
          buttonProps={{
            style: { padding: '3px 0px' },
          }}>
          <i
            id={`${item.id}_${item.color}`}
            className="mdi mdi-plus"
            onClick={increment}
          />
        </Button>
        <span style={{ padding: '10px', width: '50px' }}>{item.quantity}</span>
        <Button
          animate
          layer="alert"
          buttonProps={{
            style: { padding: '3px 0px' },
          }}>
          <i
            id={`${item.id}_${item.color}`}
            className="mdi mdi-minus"
            onClick={decrement}
          />
        </Button>
      </>,
      <>
        <i className="mdi mdi-currency-jpy" />
        {item.price}
      </>,
      <Button
        animate
        layer="alert"
        buttonProps={{
          style: { padding: 5, fontSize: 12 },
          id: `${item.id}_${item.color}`,
        }}
        onClick={removeItem}>
        Remove
      </Button>,
    ];
  });

  return (
    <>
      <div style={{ padding: 20 }}>
        <Header animate style={{ backgroundColor: 'transparent' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Heading style={{ margin: '0 0 0 10px', fontSize: '32px' }}>
              Cart
            </Heading>
            <div
              style={{
                display: 'flex',
                width: '285px',
                justifyContent: 'space-between',
              }}>
              <Linky to="/shop">
                <Button layer="primary">Return to Shop</Button>
              </Linky>
              {numItems > 0 ? (
                <Linky to={numItems > 0 ? '/checkout' : '#'}>
                  <Button layer="secondary" style={{ marginRight: 10 }}>
                    Checkout
                  </Button>
                </Linky>
              ) : (
                <Button
                  layer="disabled"
                  style={{ marginRight: 10, pointerEvents: 'none' }}>
                  Checkout
                </Button>
              )}
            </div>
          </div>
        </Header>
      </div>
      {Object.keys(cartItems).length ? (
        <Frame
          layer={'primary'}
          animate
          level={0}
          corners={4}
          style={{ margin: '10px 30px 0 30px' }}>
          <Table
            style={{ padding: 20, marginBottom: 0 }}
            animate
            headers={[
              'Product Name',
              'Type',
              'Manufacturer',
              'Color',
              'Quantity',
              'Price',
              'Modify',
            ]}
            dataset={entries}
          />
          <Content style={{ paddingLeft: 20 }}>
            <h1>
              Subtotal : <i className="mdi mdi-currency-jpy" />
              {subtotal}
            </h1>
          </Content>
        </Frame>
      ) : (
        <Frame
          layer={'primary'}
          animate
          level={0}
          corners={4}
          style={{ margin: '10px 30px 0 30px' }}>
          <Content style={{ padding: 20, textAlign: 'center' }}>
            <h1>Your Cart is Empty</h1>
            <p
              style={{
                margin: 0,
                textAlign: 'center',
                fontStyle: 'italic',
              }}>
              "Every moment I wasn't shopping at Custom Crafts, is a moment I
              regret."
            </p>
            <p
              style={{
                margin: 0,
                textAlign: 'center',
                fontStyle: 'italic',
              }}>
              - King Xrule of the Xrulian Empire (Dying Words)
            </p>
          </Content>
        </Frame>
      )}
    </>
  );
};

export default Cart;
