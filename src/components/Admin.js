import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import { apiBaseUrl } from '../config';
import { useAuth0 } from '../react-auth0-spa';
import {
  Frame,
  Heading,
  Line,
  Table,
  Button,
  Paragraph,
  Row,
  Col,
} from 'arwes';

const Admin = () => {
  const { getTokenSilently } = useAuth0();
  const token = getTokenSilently();
  let [inventory, setInventory] = useState([]);
  let [adjustStock, setAdjustStock] = useState(0);
  let [selectedShip, setSelectedShip] = useState([
    0,
    'Select a ship from the table',
  ]);

  useEffect(() => {
    const is = `
      {
        ships{
          edges{
            node{
              id
              stock
              name
              totalSold
              category {
                name
              }
              manufacturer {
                name
              }
              orderItems{
                quantity
              }
            }
          }
        }
      }
    `;

    (async () => {
      const inventoryRes = await Axios({
        url: apiBaseUrl,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        method: 'post',
        data: {
          query: is,
        },
      });
      const data = inventoryRes.data.data.ships.edges;
      const inventory = data.map((item) => {
        return item.node;
      });
      setInventory(inventory);
    })();
  }, []);

  const handleAdjustStock = async (e) => {
    if (adjustStock === 0) return;

    let query;
    if (adjustStock > 0) {
      query = `
    mutation {
      incrementShipStock(id: ${selectedShip[0]}, incQuantity: ${adjustStock}) {
        id
        stock
      }
    }
    `;
    } else if (adjustStock < 0) {
      query = `
    mutation {
      decrementShipStock(id: ${selectedShip[0]}, decQuantity: ${Math.abs(
        adjustStock
      )}) {
        id
        stock
      }
    }
    `;
    }

    const res = await Axios({
      url: `${apiBaseUrl}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'post',
      data: {
        query: query,
      },
    });
    window.location.href = '/admin';
  };

  let entries;
  if (inventory) {
    entries = inventory.map((item) => {
      return [
        <div onClick={() => setSelectedShip([item.id, item.name])}>
          <span>{item.id}</span>
        </div>,
        <div onClick={() => setSelectedShip([item.id, item.name])}>
          <span>{item.name}</span>
        </div>,
        <div onClick={() => setSelectedShip([item.id, item.name])}>
          <span>{item.stock}</span>
        </div>,
        <div onClick={() => setSelectedShip([item.id, item.name])}>
          <span>{item.totalSold}</span>
        </div>,
        <div onClick={() => setSelectedShip([item.id, item.name])}>
          <span>{item.category.name}</span>
        </div>,
        <div onClick={() => setSelectedShip([item.id, item.name])}>
          <span>{item.manufacturer.name}</span>
        </div>,
      ];
    });
  }

  return (
    <Row>
      <Col s={9}>
        {entries ? (
          <>
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
                  'Stock ID',
                  'Product Name',
                  'Stock Quantity',
                  'Total Sold',
                  'Product Category',
                  'Manufacturer',
                ]}
                dataset={entries}
              />
            </Frame>
          </>
        ) : null}
      </Col>
      <Col s={3}>
        <Frame
          layer={'primary'}
          animate
          level={0}
          corners={4}
          style={{ margin: '10px 30px 0 30px' }}>
          <Heading style={{ textAlign: 'center' }}>Adjust Ship Stock</Heading>
          <Line />
          <Heading node="h4" style={{ textAlign: 'center' }}>
            {selectedShip[1]}
          </Heading>
          <Line />
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              alignContent: 'center',
            }}>
            <Paragraph>Stock Adjustment :</Paragraph>
            <div>
              <Button
                animate
                layer="primary"
                buttonProps={{
                  style: { padding: '3px 0px' },
                }}>
                <i
                  className="mdi mdi-plus"
                  onClick={() => setAdjustStock((adjustStock += 1))}
                />
              </Button>
              <span style={{ padding: '10px', width: '50px' }}>
                {adjustStock}
              </span>
              <Button
                animate
                layer="alert"
                buttonProps={{
                  style: { padding: '3px 0px' },
                }}>
                <i
                  className="mdi mdi-minus"
                  onClick={() => setAdjustStock((adjustStock -= 1))}
                />
              </Button>
            </div>
          </div>
          <Line />
          <div
            style={{ padding: 20, display: 'flex', justifyContent: 'center' }}>
            <Button animate layer="success" onClick={handleAdjustStock}>
              Confirm Stock Adjustment
            </Button>
          </div>
        </Frame>
        <div style={{ padding: 20, display: 'flex', justifyContent: 'center' }}>
          <Link to="/shop">
            <Button animate layer="primary" onClick={handleAdjustStock}>
              Return To Shop
            </Button>
          </Link>
        </div>
      </Col>
    </Row>
  );
};

export default Admin;
