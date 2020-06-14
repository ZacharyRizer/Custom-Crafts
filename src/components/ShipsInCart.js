import React, { useContext, useEffect } from 'react';
import { Col, Loading } from 'arwes';
import { Context } from '../Context';
import ShipCardInCart from './ShipCardInCart';

const ShipsInCart = (props) => {
  let { cartItems, setCartItems } = useContext(Context);

  useEffect(() => {
    let cart = JSON.parse(localStorage.getItem('cart'));
    setCartItems(cart);
  }, []);

  return (
    <>
      {cartItems ? (
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}>
          {cartItems.map((cartItem) => (
            <Col key={cartItem.id}>
              <ShipCardInCart
                key={cartItem.id}
                color={cartItems.color}
                quantity={cartItem.quantity}
                ship={cartItem}
              />
            </Col>
          ))}
        </div>
      ) : (
        <div style={{ width: '100%', height: '100%' }}>
          <Loading animate full />
        </div>
      )}
    </>
  );
};

export default ShipsInCart;
