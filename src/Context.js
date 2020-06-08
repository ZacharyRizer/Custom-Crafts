import React, { createContext, useState } from 'react';

export const Context = createContext();

export const ContextProvider = (props) => {
  const [filters, setFilters] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [numItems, setNumItems] = useState(0);

  return <Context.Provider>{props.children}</Context.Provider>;
};
