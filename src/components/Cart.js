import React, { useContext, useEffect, useState } from 'react';
import { Link as Linky } from 'react-router-dom';
import { Context } from '../Context';
import {
  Frame,
  Heading,
  Button,
  Table,
  Line,
  Header,
  Content,
  Link,
} from 'arwes';
import Axios from 'axios';
import { useAuth0 } from '../react-auth0-spa';
import { apiBaseUrl } from '../config';

const Cart = () => {
  let { cartItems, setCartItems, numItems, setNumItems } = useContext(Context);
  let [subtotal, setSubtotal] = useState(0);
  const { getTokenSilently } = useAuth0();

  const showModal = () => {
    let modal = document.getElementById('modal');
    modal.style.display = 'block';
  };

  const handleCheckout = async () => {
    if (!cartItems || cartItems.length === 0) return;

    const token = await getTokenSilently();
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
      url: `${apiBaseUrl}`,
      headers: {
        Authorization: `Bearer ${token}`,
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

    cartItems.forEach(async (item) => {
      const res = await Axios({
        url: `${apiBaseUrl}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
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
        url: `${apiBaseUrl}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
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
  };

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
      <>
        <Button
          animate
          layer="primary"
          buttonProps={{ style: { padding: '3px 0px' } }}>
          <i onClick={increment} id={item.id} className="mdi mdi-plus" />
        </Button>
        <span style={{ padding: '10px', width: '50px' }}>{item.quantity}</span>
        <Button
          animate
          layer="alert"
          buttonProps={{ style: { padding: '3px 0px' } }}>
          <i onClick={decrement} id={item.id} className="mdi mdi-minus" />
        </Button>
      </>,
      <>
        <i className="mdi mdi-currency-jpy" />
        {item.price}
      </>,
      <Button
        animate
        layer="alert"
        buttonProps={{ style: { padding: 5, fontSize: 12 }, id: `${item.id}` }}
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
              "Every moment I wasn't shopping at Custom Crafts, was a moment I
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
            {/* <Linky to="/shop">
              <Button style={{ paddingTop: 20 }} layer="secondary">
                Return to Shop
              </Button>
            </Linky> */}
          </Content>
        </Frame>
      )}
    </>
  );
};

export default Cart;

// <Frame style={{ padding: 20 }} animate corners={4}>
//   <Heading>Shopping Cart</Heading>
// <div style={{ padding: 20 }}>
//   <Table headers={["Product Name", "Type", "Manufactuer", "Quantity", "Price", "Modify"]} dataset={entries} />
// </div>
// <Line animate layer="success" />
// <Heading node="h4">Subtotal : {subtotal}</Heading>
// <Link to="/shop">
//   <Button animate layer="success" style={{ marginRight: 25 }}>
//     Continue Shopping
//   </Button>
// </Link>
// <Link to={numItems > 0 ? "/checkout" : "#"}>
//   <Button animate layer={numItems > 0 ? "secondary" : "disabled"}>
//     Checkout
//   </Button>
// </Link>
// </Frame>;
