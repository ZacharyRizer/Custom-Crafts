import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import { useAuth0 } from '../react-auth0-spa';
import { Frame, Heading, Line, Table, Button } from 'arwes';

const Profile = () => {
  let [orders, setOrders] = useState([]);

  const { user } = useAuth0();
  console.log(user);

  const query = `
  {
    customer(customerId: ${user.id}) {
      orders {
        id
        orderItems {
          ship {
            name
            price
          }
          quantity
        }
      }
    }
  }
  `;

  useEffect(() => {
    const fetchOrders = async () => {
      const res = await Axios({
        url: 'http://localhost:5000/graphql',
        method: 'post',
        data: {
          query,
        },
      });

      setOrders(res.data.data.customer.orders);
    };
    fetchOrders();
  }, []);

  let entries = orders.map((order) => {
    return [
      order.id,
      `${order.orderItems
        .map((item) => `${item.ship.name} ( x ${item.quantity} )`)
        .join(' --- ')}`,
      order.orderItems.reduce((accum, item) => {
        return accum + item.ship.price * item.quantity;
      }, 0),
    ];
  });

  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Frame
          style={{
            border: '2px dotted',
          }}>
          <img
            src={user.picture}
            alt="Profile"
            style={{ width: '250px', height: '250px' }}
          />
        </Frame>
      </div>
      <h3 style={{ textAlign: 'center' }}>{user.name}</h3>
      <p style={{ textAlign: 'center', fontSize: 12 }}>{user.email}</p>
      <Heading node="h1" style={{ textAlign: 'center' }}>
        Purchase History
      </Heading>
      <Line animate layer="success" />
      <Table
        headers={['Order Number', 'Ordered Items', 'Order Total']}
        dataset={entries}
      />
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Link to="/shop">
          <Button animate layer="secondary">
            Back to Shop <i className="mdi mdi-rocket-launch" />
          </Button>
        </Link>
      </div>
    </>
  );
};

export default Profile;
