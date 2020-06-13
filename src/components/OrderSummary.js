import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Context } from '../Context';
import { Frame, Heading, Button, Table, Line, Content } from 'arwes';
import Axios from 'axios';
import { useAuth0 } from '../react-auth0-spa';
import { apiBaseUrl } from '../config';

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
    const orderItemsCart = cartItems.map((item) =>
      JSON.stringify({ shipId: parseInt(item.id), quantity: item.quantity })
    );

    let jsonCart = JSON.stringify(orderItemsCart);
    jsonCart = jsonCart.replace(/"{/g, '{');
    jsonCart = jsonCart.replace(/}"/g, '}');
    console.log(jsonCart);

    // order creation query string
    let os = `
      mutation addOrder($customerId: Int!) {
        addOrder (cart: {customerId: $customerId, items: "${jsonCart}"}){
          id
        }
      }
    `;

    console.log('os', os);

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
    return [
      item.name,
      item.quantity,
      <>
        <i className="mdi mdi-currency-jpy" />
        {item.price}
      </>,
    ];
  });

  return (
    <Frame
      layer={'primary'}
      animate
      level={0}
      corners={0}
      style={{ margin: 20 }}>
      <Content style={{ padding: 40 }}>
        <h1>Order Summary</h1>
        <Line animate />
        <Table animate headers={['ITEM', 'QTY', 'PRICE']} dataset={entries} />
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '20px 0',
          }}>
          <Link to="/cart">
            <Button animate layer="secondary">
              Back to Cart
            </Button>
          </Link>
          <Link to="/shop">
            <Button animate layer="secondary">
              Return to Shop
            </Button>
          </Link>
        </div>
        <Line animate />
        <h2>
          Order Total : <i className="mdi mdi-currency-jpy" />
          {subtotal}
        </h2>
        <Button
          style={{ width: '100%' }}
          buttonProps={{ style: { width: '100%' } }}
          animate
          layer="success"
          onClick={handleCheckout}>
          Confirm Order
        </Button>
      </Content>
    </Frame>
  );
};

export default OrderSummary;
