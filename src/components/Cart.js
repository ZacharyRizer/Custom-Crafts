import React, { useContext, useEffect, useState } from "react";
import { Link as Linky } from "react-router-dom";
import { Context } from "../Context";
import { Frame, Heading, Button, Table, Line, Header, Content, Link } from "arwes";

const Cart = () => {
  let { cartItems, setCartItems, numItems, setNumItems } = useContext(Context);
  let [subtotal, setSubtotal] = useState(0);

  useEffect(() => {
    if (localStorage.getItem("cart")) {
      let cart = JSON.parse(localStorage.getItem("cart"));
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
    localStorage.setItem("itemNum", JSON.stringify(numItems));
    setCartItems(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
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
    localStorage.setItem("itemNum", JSON.stringify(numItems));
    setCartItems(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const removeItem = (e) => {
    let id = e.target.id;
    let itemToRemove = cartItems.find((item) => item.id === id);
    let numToRemove = itemToRemove.quantity;
    setNumItems((numItems -= numToRemove));
    localStorage.setItem("itemNum", JSON.stringify(numItems));

    let newCart = cartItems.filter((item) => item.id !== id);
    setCartItems(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  let entries = cartItems.map((item) => {
    return [
      <Linky
        to={`/ships/${item.id}`}
        style={{
          textDecoration: "none",
          color: "#26dafd",
        }}
      >
        <Link>{item.name}</Link>
      </Linky>,
      item.category.name,
      item.manufacturer.name,
      <>
        <Button animate layer="primary" buttonProps={{ style: { padding: "3px 0px" } }}>
          <i onClick={increment} id={item.id} className="mdi mdi-plus" />
        </Button>
        <span style={{ padding: "10px", width: "50px" }}>{item.quantity}</span>
        <Button animate layer="alert" buttonProps={{ style: { padding: "3px 0px" } }}>
          <i onClick={decrement} id={item.id} className="mdi mdi-minus" />
        </Button>
      </>,
      item.price,
      <Button
        animate
        layer="alert"
        buttonProps={{ style: { padding: 5, fontSize: 12 }, id: `${item.id}` }}
        onClick={removeItem}
      >
        Remove
      </Button>,
    ];
  });

  return (
    <>
      <div style={{ padding: 20 }}>
        <Header animate style={{ backgroundColor: "transparent" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Heading style={{ margin: "0 0 0 10px", fontSize: "32px" }}>Cart</Heading>
            <div
              style={{
                display: "flex",
                width: "300px",
                justifyContent: "space-between",
              }}
            >
              <Linky to="/shop">
                <Button layer="primary">Return to Shop</Button>
              </Linky>
              {numItems > 0 ? (
                <Linky to={numItems > 0 ? "/checkout" : "#"}>
                  <Button layer="secondary" style={{ marginRight: 10 }}>
                    Checkout
                  </Button>
                </Linky>
              ) : (
                <Button layer="disabled" style={{ marginRight: 10, pointerEvents: "none" }}>
                  No Items in Cart
                </Button>
              )}
            </div>
          </div>
        </Header>
      </div>
      {Object.keys(cartItems).length ? (
        <Frame layer={"primary"} animate level={0} corners={4} style={{ margin: "10px 30px 0 30px" }}>
          <Table
            style={{ padding: 20, marginBottom: 10 }}
            animate
            headers={["Product Name", "Type", "Manufacturer", "Quantity", "Price", "Modify"]}
            dataset={entries}
          />
        </Frame>
      ) : (
        <Frame layer={"primary"} animate level={0} corners={4} style={{ margin: "10px 30px 0 30px" }}>
          <Content style={{ padding: 20, textAlign: "center" }}>
            <h1>Your Cart is Empty</h1>
            <p
              style={{
                margin: 0,
                textAlign: "center",
                fontStyle: "italic",
              }}
            >
              "Every moment I wasn't shopping at Custom Crafts, was a moment I regret."
            </p>
            <p
              style={{
                margin: 0,
                textAlign: "center",
                fontStyle: "italic",
              }}
            >
              - King Xrule of the Xrulian Empire (Dying Words)
            </p>
            <Linky to="/shop">
              <Button style={{ paddingTop: 20 }} layer="secondary">
                Return to Shop
              </Button>
            </Linky>
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
