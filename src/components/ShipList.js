import React, { useContext, useEffect, useState } from 'react';
import { Row, Col, Loading } from 'arwes';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Box from '@material-ui/core/Box';

import { Context } from '../Context';
import ShipCard from './ShipCard';
import Axios from 'axios';

const ShipList = () => {
  let [data, setData] = useState()
  let { filters } = useContext(Context);
  console.log('filters: ', filters)

  let queryVariables = {};

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

    ts += buildQueryParams(); //101
    console.log('ts after buildQueryParams: ', ts);
    ts += `) {
      ships(filters: {  
    `;

    ts += buildFiltersString(); //127


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
    if (Object.keys(filters).length === 0) return qs;
    console.log('ts sent to axios: ', ts)
    return ts;//140
  };


  const buildQueryParams = () => {
    let ps = ``;
    const filterKeys = Object.keys(filters);
    for (let i = 0; i < filterKeys.length; i++) {
      const filter = filterKeys[i];
      switch (filter) {
        case `categoryId`:
          ps += `${filter}: Int!`;
          queryVariables[filter] = filters[filter];
          break;
        case `manufacturerId`:
          ps += `${filter}: Int!`;
          queryVariables[filter] = filters[filter];
          break;
        case `priceRange`:
          ps += `priceRangeBegin: Int!, $priceRangeEnd: Int!`;
          queryVariables['priceRangeBegin'] = filters['priceRange'].begin;
          queryVariables['priceRangeEnd'] = filters['priceRange'].end;
          break;
        case `sizeRange`:
          ps += `sizeRangeBegin: Int!, $sizeRangeEnd: Int!`;
          queryVariables['sizeRangeBegin'] = filters['sizeRange'].begin;
          queryVariables['sizeRangeEnd'] = filters['sizeRange'].end;
          break;
        case `crewCapRange`:
          ps += `crewCapRangeBegin: Int!, $crewCapRangeEnd: Int!`;
          queryVariables['crewCapRangeBegin'] = filters['crewCapRange'].begin;
          queryVariables['crewCapRangeEnd'] = filters['crewCapRange'].end;
          break;
        case `travelRangeRange`:
          ps += `travelRangeRangeBegin: Int!, $travelRangeRangeEnd: Int!`;
          queryVariables['travelRangeRangeBegin'] = filters['travelRangeRange'].begin;
          queryVariables['travelRangeRangeEnd'] = filters['travelRangeRange'].end;
          break;
      }
      if (i !== filterKeys.length - 1) ps += `, $`
    }
    console.log('ps: ', ps);
    return ps; //44
  }

  const buildFiltersString = () => {
    let fs = ``;
    const filterKeys = Object.keys(filters);
    for (let i = 0; i < filterKeys.length; i++) {
      const filter = filterKeys[i];
      fs += `${filter}: `;
      switch (filter) {
        case `categoryId`:
          fs += `$categoryId`;
          break;
        case `manufacturerId`:
          fs += `$manufacturerId`;
          break;
        case `priceRange`:
          fs += `{begin: $priceRangeBegin, end: $priceRangeEnd}`
          break;
        case `sizeRange`:
          fs += `{begin: $sizeRangeBegin, end: $sizeRangeEnd}`
          break;
        case `crewCapRange`:
          fs += `{begin: $crewCapRangeBegin, end: $crewCapRangeEnd}`
          break;
        case `travelRangeRange`:
          fs += `{begin: $travelRangeRangeBegin, end: $travelRangeRangeEnd}`
          break;
      }
      if (i !== filterKeys.length - 1) fs += `, `
    }

    console.log('fs after buildFilterString: ', fs)
    return fs; //50
  }


  useEffect(() => {
    (async () => {
      const qs = buildQueryString();//16
      console.log('qs before axios: ', qs)
      console.log('filters before axios: ', filters)
      const res = await Axios({
        url: 'http://localhost:5000/graphql',
        method: 'post',
        data: {
          query: qs,
          variables: queryVariables
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
          <div>
            <Loading animate full />
          </div>
        )}
    </>
  );
};

export default ShipList;
