import React, { useContext, useEffect } from 'react';
import { Context } from '../Context';

const ShipsInCart = (props) => {
  let { cartItems, setCartItems } = useContext(Context);

  useEffect(() => {
    let cart = JSON.parse(localStorage.getItem('cart'));
    setCartItems(cart);
  }, []);

  return <h1>check out these ships</h1>;
};

export default ShipsInCart;
