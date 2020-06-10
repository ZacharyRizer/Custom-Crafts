import React, { useContext, useEffect, useState } from 'react';
import { Row, Col, Loading } from 'arwes';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Box from '@material-ui/core/Box';

import { Context } from '../Context';
import ShipCard from './ShipCard';
import Axios from 'axios';

const ShipList = () => {
  let [data, setData] = useState();
  const { filters } = useContext(Context);

  const buildQueryString = () => {
    let qs = ``;

    qs = `
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
    return qs;
  };

  useEffect(() => {
    (async () => {
      const qs = buildQueryString();
      const res = await Axios({
        url: 'http://localhost:5000/graphql',
        method: 'post',
        data: {
          query: qs,
        },
      });

      setData(res.data.data);
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

// return (
//   <>
//
//     <Row>
//       <Col s={6} xl={3}>
//         <ShipCard
//           stock={6}
//           name="ISV Rimward Gold"
//           type="Performance"
//           manufacturer="Corellian Engineering Corporation"
//           price={100000}
//           link="/"
//           ship="/spaceships/test_ship.glb"
//         />
//       </Col>
//       <Col s={6} xl={3}>
//         <ShipCard
//           stock={5}
//           name="ISV Rimward Gold"
//           type="Performance"
//           manufacturer="Corellian Engineering Corporation"
//           price={100000}
//           link="/"
//           ship="/spaceships/test_ship.glb"
//         />
//       </Col>
//       <Col s={6} xl={3}>
//         <ShipCard
//           stock={0}
//           name="ISV Rimward Gold"
//           type="Performance"
//           manufacturer="Corellian Engineering Corporation"
//           price={100000}
//           link="/"
//           ship="/spaceships/test_ship.glb"
//         />
//       </Col>
//       <Col s={6} xl={3}>
//         <ShipCard
//           stock={0}
//           name="ISV Rimward Gold"
//           type="Performance"
//           manufacturer="Corellian Engineering Corporation"
//           price={100000}
//           link="/"
//           ship="/spaceships/test_ship.glb"
//         />
//       </Col>
//     </Row>
//   </>
// );

export default ShipList;
