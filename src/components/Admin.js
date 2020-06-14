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
  Image,
  Header,
  Appear,
  Row,
  Col,
  Content,
} from 'arwes';

const Admin = () => {
  const { getTokenSilently } = useAuth0();
  const token = getTokenSilently();
  let [inventory, setInventory] = useState([]);

  useEffect(() => {
    const is = `
      {
        ships{
          edges{
            node{
              id
              stock
              name
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
      console.log('inventory', inventory);
    })();
  }, []);
  let entries;
  if (inventory) {
    entries = inventory.map((item => {
      return [
        <>
          <span>{item.id}</span>,
          <span>{item.name}</span>,
          <span>{item.stock}</span>,
          <span>{item.id}</span>,
          <span>{item.category.name}</span>,
          <span>{item.manufacturer.name}</span>
        </>
      ]
    }))
  }

  return (
    <>{entries ? (
      <>
        <Frame>Checkout all these sweet admin things!</Frame>
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
              'Manufacturer'
            ]}
            dataset={entries}
          />

          {/* <Content style={{ paddingLeft: 20 }}>
          <h1>
            Put data here
          </h1>
        </Content> */}
        </Frame>
      </>
    ) : null}
    </>

  )
};

export default Admin;
