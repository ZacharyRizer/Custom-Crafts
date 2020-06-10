import React, { useEffect, useContext, useState } from 'react';
import { Row, Col, Loading } from 'arwes';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Box from '@material-ui/core/Box';

import { Context } from '../Context';
import ShipCard from './ShipCard';
import Axios from 'axios';
const { createApolloFetch } = require('apollo-fetch');

const fetch = createApolloFetch({
  uri: 'http://localhost5000/graphql'
});

const ShipList = () => {
  let [data, setData] = useState()
  let { filters } = useContext(Context);
  console.log('filters: ', filters)

  const buildQueryString = () => {
    let gs = `
    query TestQuery($manufacturerId: Int!){
      ships(filters: {manufacturerId: $manufacturerId}) {
        edges {
          node {
            id
            stock
            name
            category {
              name
            }
            manufacturer {
              name
            }
            price
            modelLink
          }
        }
      }
    }
`;


    let ts = `
    {
      ships (filters: {
    `


    for (let filter in filters) {
      ts += `${filter}:`;
      ts += `"${filters[filter]}"`;
    }

    ts += `}) {
      edges {
        node {
          id
          stock
          name
          category{
            name
          }
          manufacturer{
            name
          }
          price
          modelLink
        }
      }
    }
  }
`;

    const qs = `
    {
      ships {
        edges {
          node {
            id
            stock
            name
            category{
              name
            }
            manufacturer{
              name
            }
            price
            modelLink
          }
        }
      }
    }
`;
    console.log('ts: ', ts)
    return gs;
  };

  useEffect(() => {
    (async () => {
      const qs = buildQueryString();
      console.log('qs: ', qs)
      const res = await Axios({
        url: 'http://localhost:5000/graphql',
        method: 'post',
        data: {
          query: qs, variables: { "manufacturerId": 1 }
        },
      });

      data = res.data.data;
      console.log('data: ', data)
      setData(data)

    })();
  }, [filters]);

  return (
    <>
      {data ? (
        <Row>
          {data.ships.edges.map((shipNode) => (
            <Col>
              <ShipCard key={shipNode.node.id} ship={shipNode.node} />
            </Col>
          ))}
        </Row>
      ) : (
          <Loading animate full />
        )}
    </>
  );
};

export default ShipList;
