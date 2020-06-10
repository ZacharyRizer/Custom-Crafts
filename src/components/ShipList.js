<<<<<<< HEAD
import React, { useEffect, useContext, useState } from 'react';
=======
import React, { useContext, useEffect, useState } from 'react';
>>>>>>> master
import { Row, Col, Loading } from 'arwes';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Box from '@material-ui/core/Box';

import { Context } from '../Context';
import ShipCard from './ShipCard';
import Axios from 'axios';

const ShipList = () => {
<<<<<<< HEAD
  let [data, setData] = useState()
  let { filters } = useContext(Context);
  console.log('filters: ', filters)
=======
  let [data, setData] = useState();
  const { filters } = useContext(Context);
>>>>>>> master

  const buildQueryString = () => {
    let gs = `
    query shipQuery($categoryId: Int!){
      ships(filters: {categoryId: $categoryId}) {
        edges {
          node {
            id
            stock
            name
            manufacturer {
              name
            }
            category {
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
      query shipsQuery($
    `;

    // filter key switch statement

    for (let filter in filters) {
      ts += `${filter}:`;
      ts += filters[filter];
    }

    ts += `
      categoryId: Int!){
      ships(filters: {
    `


    for (let filter in filters) {
      ts += `${filter}:`;
      ts += filters[filter];
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
    return ts;
  };

  useEffect(() => {
    (async () => {
      const qs = buildQueryString();
      console.log('qs: ', qs)
      const res = await Axios({
        url: 'http://localhost:5000/graphql',
        method: 'post',
        data: {
          query: qs,
          variables: filters
        },
      });

<<<<<<< HEAD
      data = res.data.data;
      console.log('data: ', data)
      setData(data)

=======
      setData(res.data.data);
>>>>>>> master
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
<<<<<<< HEAD
          <Loading animate full />
        )}
=======
        <div>
          <Loading animate full />
        </div>
      )}
>>>>>>> 96f7c0c94dd82ee675020ca027347d0e1e6a0565
    </>
  );
};

export default ShipList;
