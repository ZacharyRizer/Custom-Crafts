import React, { useState, useEffect, Fragment } from "react";
import { useAuth0 } from "../react-auth0-spa";
import { Link } from "react-router-dom";
import Axios from "axios";
import { Frame, Heading, Line, Table, Button } from "arwes";

const Profile = () => {
  let [orders, setOrders] = useState([]);

  // const id = props.match.params.customerId;
  const user = JSON.parse(localStorage.getItem("custom_crafts_userObj"));
  console.log("id 22", user.id);
  const query = `
  {
    customer(customerId: ${user.id}) {
      orders {
        id
        orderItems {
          ship {
            name
          }
          quantity
        }
      }
    }
  }
  `;

  useEffect(() => {
    (async () => {
      const res = await Axios({
        url: "http://localhost:5000/graphql",
        method: "post",
        data: {
          query,
        },
      });
      setOrders(res.data.data.customer.orders);
    })();
  }, []);

  // const { loading } = useAuth0();
  // // const { loading, user } = useAuth0();

  // if (loading || !user) {
  //   return <div>Loading...</div>;
  // }

  console.log(orders);
  let entries = orders.map((order) => {
    return [order.id, order.orderItems.map((item) => item.id)];
  });

  return (
    <Fragment>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Frame
          style={{
            border: "2px dotted",
          }}
        >
          <img src={user.picture} alt="Profile" />
        </Frame>
      </div>
      <h3 style={{ textAlign: "center" }}>{user.name}</h3>
      <p style={{ textAlign: "center", fontSize: 12 }}>{user.email}</p>
      <Heading node="h1" style={{ textAlign: "center" }}>
        Purchase History
      </Heading>
      <Line animate layer="success" />
      <Table
        headers={["Order Number", "Ordered Items", "Quantity"]}
        dataset={[entries]}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Link to="/shop">
          <Button animate layer="secondary">
            Back to Shop <i className="mdi mdi-rocket-launch" />
          </Button>
        </Link>
      </div>
      {/* <code>{JSON.stringify(user, null, 2)}</code> */}
    </Fragment>
  );
};

export default Profile;
