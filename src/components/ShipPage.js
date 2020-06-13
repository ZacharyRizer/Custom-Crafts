import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../Context';
import { Link } from 'react-router-dom';
import { Frame, Content, Heading, Header, Row, Col, Button } from 'arwes';
import Axios from 'axios';
import { apiBaseUrl } from '../config';

const ShipPage = (props) => {
  let [ship, setShip] = useState();
  let { cartItems, setCartItems, numItems, setNumItems } = useContext(Context);
  const id = props.match.params.shipId;
  const query = `
  {
    ship(shipId: ${id}) {
      id
      name
      manufacturer {
        name
      }
      category {
        name
      }
      price
      used
      ftl
      stock
      designer
      size
      crewCap
      travelRange
      description
      modelLink
    }
  }
  `;

  useEffect(() => {
    (async () => {
      const res = await Axios({
        url: `${apiBaseUrl}`,
        method: 'post',
        data: {
          query,
        },
      });
      setShip(res.data.data.ship);
    })();
    if (localStorage.getItem('cart')) {
      let cart = JSON.parse(localStorage.getItem('cart'));
      setCartItems(cart);
    }
  }, []);

  const addToCart = () => {
    let newCart;
    let found = cartItems.find((item) => item.name === ship.name);
    if (!found && ship.stock > 0) {
      ship.quantity = 1;
      setNumItems((numItems += 1));
      newCart = [...cartItems, ship];
    } else {
      newCart = [...cartItems];
      newCart.forEach((item) => {
        if (item.name === ship.name && item.quantity < item.stock) {
          item.quantity = item.quantity + 1;
          setNumItems((numItems += 1));
        }
      });
    }
    setCartItems(newCart);

    localStorage.setItem('cart', JSON.stringify(newCart));
    localStorage.setItem('itemNum', JSON.stringify(numItems));
  };

  return (
    <>
      {ship && (
        <div style={{ padding: 20 }}>
          <Header animate style={{ backgroundColor: 'transparent' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Heading style={{ margin: '0 0 0 10px', fontSize: '32px' }}>
                {ship.name}
              </Heading>
              <div
                style={{
                  display: 'flex',
                  width: '300px',
                  justifyContent: 'space-between',
                }}>
                <Link to="/shop">
                  <Button animate layer="primary">
                    Return to Shop
                  </Button>
                </Link>
                {ship.stock > 0 ? (
                  <Button
                    layer="secondary"
                    style={{ marginRight: 10 }}
                    onClick={addToCart}>
                    Add to Cart
                  </Button>
                ) : (
                  <Button
                    layer="disabled"
                    style={{ marginRight: 10, pointerEvents: 'none' }}>
                    Out of Stock
                  </Button>
                )}
              </div>
            </div>
          </Header>
          <Content>
            <Row>
              <Col s={6}>
                <Frame
                  layer={'primary'}
                  animate
                  level={0}
                  corners={4}
                  style={{ margin: 20 }}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      margin: '20px',
                    }}>
                    <blockquote style={{ margin: '0 0 0 0' }}>
                      <i className="mdi mdi-currency-jpy" />
                      {ship.price}
                    </blockquote>
                    {ship.used ? (
                      <blockquote
                        data-layer="alert"
                        style={{ margin: '0 0 0 20px' }}>
                        Used
                      </blockquote>
                    ) : (
                      <blockquote
                        data-layer="success"
                        style={{ margin: '0 0 0 20px' }}>
                        New
                      </blockquote>
                    )}
                    {ship.ftl ? (
                      <blockquote
                        data-layer="success"
                        style={{ margin: '0 0 0 20px' }}>
                        FTL Drive Included
                      </blockquote>
                    ) : (
                      <blockquote
                        data-layer="alert"
                        style={{ margin: '0 0 0 20px' }}>
                        No FTL Drive
                      </blockquote>
                    )}
                    {ship.stock > 2 ? (
                      <blockquote
                        data-layer=""
                        style={{ margin: '0 0 0 20px' }}>
                        Stock: {ship.stock}
                      </blockquote>
                    ) : ship.stock > 0 ? (
                      <blockquote
                        data-layer="alert"
                        style={{ margin: '0 0 0 20px' }}>
                        Stock: {ship.stock}
                      </blockquote>
                    ) : (
                      <blockquote
                        data-layer="disabled"
                        style={{ margin: '0 0 0 20px' }}>
                        Stock: {ship.stock}
                      </blockquote>
                    )}
                    <blockquote
                      data-layer="disabled"
                      style={{ margin: '0 0 0 20px' }}>
                      Designed by: {ship.designer}
                    </blockquote>
                  </div>
                </Frame>
                <Frame
                  layer={'primary'}
                  animate
                  level={0}
                  corners={4}
                  style={{ margin: 20 }}>
                  <div style={{ padding: '20px' }}>
                    <p style={{ display: 'inline' }}>Craft Type:</p>
                    <blockquote>{ship.category.name}</blockquote>
                    <p style={{ display: 'inline' }}>Manufacturer:</p>
                    <blockquote>{ship.manufacturer.name}</blockquote>
                    <p style={{ display: 'inline' }}>Ship Size:</p>
                    <blockquote>{ship.size} Meters</blockquote>
                    <p style={{ display: 'inline' }}>Crew Capacity:</p>
                    <blockquote>{ship.crewCap}</blockquote>
                    <p style={{ display: 'inline' }}>Travel Range:</p>
                    <blockquote>{ship.travelRange} Parsec(s)</blockquote>
                  </div>
                </Frame>
              </Col>
              <Col s={6}>
                <Frame
                  layer={'primary'}
                  animate
                  level={0}
                  corners={4}
                  style={{ margin: 20 }}>
                  <model-viewer
                    style={{
                      backgroundColor: 'transparent',
                      height: '400px',
                      width: '100%',
                      margin: 'auto',
                      '--poster-color': 'transparent',
                      '--progress-bar-color': 'transparent',
                      '--progress-mask': 'transparent',
                    }}
                    src={ship.modelLink}
                    alt="A 3D model of a spaceship"
                    auto-rotate
                    auto-rotate-delay={1000}
                    camera-controls
                    exposure={0.75}

                    camera-orbit="0deg 75deg 75%"
                    interaction-prompt="none"
                  ></model-viewer>
                </Frame>
                <Frame
                  layer={'primary'}
                  animate
                  level={0}
                  corners={4}
                  style={{ margin: 20 }}>
                  <div style={{ padding: '20px' }}>
                    <p style={{ margin: 0 }}>{ship.description}</p>
                  </div>
                </Frame>
              </Col>
            </Row>
          </Content>
        </div>
      )}
    </>
  );
};

export default ShipPage;
