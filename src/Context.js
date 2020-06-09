import React, { createContext, useState } from 'react';

export const Context = createContext();

export const ContextProvider = (props) => {
  const [filters, setFilters] = useState({});
  const [cartItems, setCartItems] = useState([]);
  const [numItems, setNumItems] = useState(0);

  return (
<<<<<<< HEAD
    <Context.Provider value={{ filters, setFilters, cartItems, setCartItems, numItems, setNumItems }}>
      {props.children}
    </Context.Provider>
  );
=======
    <Context.Provider value={{filters, setFilters, cartItems, setCartItems, numItems, setNumItems}}>
      {props.children}
    </Context.Provider>
  )
>>>>>>> 612cefda4d4d8f2d8bbbd82821fb2c7a71d5c9f7
};
