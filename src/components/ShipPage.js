import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../Context';
import { Link, Redirect } from 'react-router-dom';
import { Frame, Content, Heading, Header, Row, Col, Button } from 'arwes';
import Axios from 'axios';
import { apiBaseUrl } from '../config';
import AllReviews from './AllReviews';

const ShipPage = (props) => {
  let [ship, setShip] = useState();
  let [reviews, setReviews] = useState([]);
  let [rating, setRating] = useState([]);
  const [shipColor, setShipColor] = useState();
  const [shipImage, setShipImage] = useState();
  let { cartItems, setCartItems, numItems, setNumItems } = useContext(Context);
  const id = props.match.params.shipId;
  const intID = parseInt(id);
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
      reviews {
        id
        customer {
          name
          picture
        }
        description
        rating
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

      const ship = res.data.data.ship;
      setShip(ship);
      setShipImage(ship.modelLink);
      setShipColor(ship.modelLink.split('_')[1].split('.')[0]);
      const revs = ship.reviews; // array with id, description, rating
      setReviews(revs);

      if (revs.length > 0) {
        let ratingNumber = revs.map((r) => r.rating);
        ratingNumber = Math.round(
          ratingNumber.reduce((a, b) => a + b) / ratingNumber.length
        );
        let finalList = [];
        for (let i = 0; i < 5; i++) {
          if (i <= ratingNumber - 1) {
            finalList.push(<i className="mdi mdi-star" />);
          } else {
            finalList.push(<i className="mdi mdi-star-outline" />);
          }
        }
        setRating(finalList);
      }
    })();

    if (localStorage.getItem('cart')) {
      let cart = JSON.parse(localStorage.getItem('cart'));
      setCartItems(cart);
    }
  }, [setShip]);

  useEffect(() => {
    if (ship) {
      const shipImgBase = ship.modelLink.split('_')[0];
      setShipImage(`${shipImgBase}_${shipColor}.glb`);
    }
  }, [shipColor]);

  const addToCart = () => {
    const totalQuantity = cartItems.reduce((accum, item) => {
      if (item.name === ship.name) {
        return accum + item.quantity;
      }
      return accum;
    }, 0);

    let newCart;
    let found = cartItems.find(
      (item) => item.name === ship.name && item.color === shipColor
    );

    if (!found && totalQuantity < ship.stock) {
      let currentItem = { ...ship };

      currentItem.quantity = 1;
      currentItem.color = shipColor;
      setNumItems((numItems += 1));
      newCart = [...cartItems, currentItem];
    } else {
      newCart = [...cartItems];
      newCart.forEach((item) => {
        if (
          item.name === ship.name &&
          item.color === shipColor &&
          totalQuantity < ship.stock
        ) {
          item.quantity = item.quantity + 1;
          setNumItems((numItems += 1));
        }
      });
    }
    setCartItems(newCart);

    localStorage.setItem('cart', JSON.stringify(newCart));
    localStorage.setItem('itemNum', JSON.stringify(numItems));
  };

  const setColor = (e) => {
    const id = e.target.id;
    setShipColor(id);
  };

  return (
    <>
      {(!Number.isInteger(intID) || intID < 1 || intID > 15) && (
        <Redirect to="/404" />
      )}
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
              <Col s={12} l={6}>
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
                <Col s={6}>
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
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '20px 20px 0 20px',
                      }}>
                      <Link to="/store">
                        <Button animate layer="secondary">
                          Write Review
                        </Button>
                      </Link>
                      <Content>
                        <blockquote style={{ margin: 0 }}>
                          {reviews ? (
                            <>{rating}</>
                          ) : (
                            <>
                              <i className="mdi mdi-star" />
                              <i className="mdi mdi-star" />
                              <i className="mdi mdi-star" />
                              <i className="mdi mdi-star" />
                              <i className="mdi mdi-star" />
                            </>
                          )}
                        </blockquote>
                      </Content>
                    </div>
                    <div
                      style={{
                        height: 450,
                        maxHeight: 450,
                        padding: '20px',
                        display: 'flex',
                        flexDirection: 'column',
                      }}>
                      <AllReviews reviews={reviews} />
                    </div>
                  </Frame>
                </Col>
              </Col>
              <Col s={12} l={6}>
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
                    src={shipImage}
                    alt="A 3D model of a spaceship"
                    auto-rotate
                    auto-rotate-delay={1000}
                    camera-controls
                    exposure={0.75}
                    camera-orbit="0deg 75deg 75%"
                    interaction-prompt="none"></model-viewer>
                </Frame>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    margin: 10,
                    marginLeft: 80,
                    marginRight: 80,
                  }}>
                  <p style={{ display: 'inline' }}>Choose Color : </p>
                  <Button
                    animate
                    layer="primary"
                    buttonProps={{ id: 'blue' }}
                    onClick={setColor}>
                    Blue
                  </Button>
                  <Button
                    animate
                    layer="success"
                    buttonProps={{ id: 'green' }}
                    onClick={setColor}>
                    Green
                  </Button>
                  <Button
                    animate
                    layer="secondary"
                    buttonProps={{ id: 'orange' }}
                    onClick={setColor}>
                    Orange
                  </Button>
                  <Button
                    animate
                    layer="alert"
                    buttonProps={{ id: 'red' }}
                    onClick={setColor}>
                    Red
                  </Button>
                </div>
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
