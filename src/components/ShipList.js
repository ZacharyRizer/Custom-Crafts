import React, { useContext, useEffect, useState } from "react";
import { Col, Loading } from "arwes";

import { Context } from "../Context";
import ShipCard from "./ShipCard";
import Axios from "axios";

const ShipList = () => {
  let [data, setData] = useState();
  let { filters } = useContext(Context);

  let queryVariables = {};

  const buildQueryString = () => {
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

    let fs = `
  query shipsQuery($
    `;

    fs += buildQueryParams();
    fs += `) {
    ships(filters: {
  `;

    fs += buildFiltersString();

    fs += `}) {
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

    return fs;
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
        case `nameIlike`:
          ps += `${filter}: String!`;
          queryVariables[filter] = filters[filter];
          break;
        case `priceRange`:
          ps += `priceRangeBegin: Int!, $priceRangeEnd: Int!`;
          queryVariables["priceRangeBegin"] = filters["priceRange"].begin;
          queryVariables["priceRangeEnd"] = filters["priceRange"].end;
          break;
        case `sizeRange`:
          ps += `sizeRangeBegin: Int!, $sizeRangeEnd: Int!`;
          queryVariables["sizeRangeBegin"] = filters["sizeRange"].begin;
          queryVariables["sizeRangeEnd"] = filters["sizeRange"].end;
          break;
        case `crewCapRange`:
          ps += `crewCapRangeBegin: Int!, $crewCapRangeEnd: Int!`;
          queryVariables["crewCapRangeBegin"] = filters["crewCapRange"].begin;
          queryVariables["crewCapRangeEnd"] = filters["crewCapRange"].end;
          break;
        case `travelRangeRange`:
          ps += `travelRangeRangeBegin: Int!, $travelRangeRangeEnd: Int!`;
          queryVariables["travelRangeRangeBegin"] = filters["travelRangeRange"].begin;
          queryVariables["travelRangeRangeEnd"] = filters["travelRangeRange"].end;
          break;
      }
      if (i !== filterKeys.length - 1) ps += `, $`;
    }
    return ps;
  };

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
        case `nameIlike`:
          fs += `$nameIlike`
          break;
        case `priceRange`:
          fs += `{begin: $priceRangeBegin, end: $priceRangeEnd}`;
          break;
        case `sizeRange`:
          fs += `{begin: $sizeRangeBegin, end: $sizeRangeEnd}`;
          break;
        case `crewCapRange`:
          fs += `{begin: $crewCapRangeBegin, end: $crewCapRangeEnd}`;
          break;
        case `travelRangeRange`:
          fs += `{begin: $travelRangeRangeBegin, end: $travelRangeRangeEnd}`;
          break;
      }
      if (i !== filterKeys.length - 1) fs += `, `;
    }
    return fs;
  };

  useEffect(() => {
    (async () => {
      const qs = buildQueryString(); //16
      console.log('qs 154: ', qs)
      const res = await Axios({
        url: "http://localhost:5000/graphql",
        method: "post",
        data: {
          query: qs,
          variables: queryVariables,
        },
      });

      data = res.data.data;
      setData(data);
    })();
  }, [filters]);

  return (
    <>
      {data ? (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {data.ships.edges.map((shipNode) => (
            <Col key={shipNode.node.id}>
              <ShipCard key={shipNode.node.id} ship={shipNode.node} />
            </Col>
          ))}
        </div>
      ) : (
          <div style={{ width: "100%", height: "100%" }}>
            <Loading animate full />
          </div>
        )}
    </>
  );
};

export default ShipList;
