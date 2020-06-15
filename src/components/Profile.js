import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import { apiBaseUrl } from "../config";
import { useAuth0 } from "../react-auth0-spa";
import { Frame, Heading, Line, Table, Button, Image, Header, Appear, Row, Col, Content } from "arwes";

const Profile = () => {
  let [orders, setOrders] = useState([]);
  const { getTokenSilently } = useAuth0();
  const { user } = useAuth0();

  useEffect(() => {
    if (!user) return;
    console.log("user in profile: ", user);

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

    const fetchOrders = async () => {
      const token = await getTokenSilently();
      const res = await Axios({
        url: `${apiBaseUrl}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        method: "post",
        data: {
          query,
        },
      });
      setOrders(res.data.data.customer.orders);
    };
    fetchOrders();
  }, [user]);

  let entries = orders.map((order) => {
    return [
      order.id,
      `${order.orderItems.map((item) => `${item.ship.name} ( x ${item.quantity} )`).join(" -- ")}`,
      <>
        <i className="mdi mdi-currency-jpy" />
        {order.orderItems.reduce((accum, item) => {
          return accum + item.ship.price * item.quantity;
        }, 0)}
      </>,
    ];
  });

  return (
    <>
      {user ? (
        <div style={{ padding: 20 }}>
          <Header animate style={{ backgroundColor: "transparent" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginRight: 10,
              }}
            >
              <Appear>
                <Heading style={{ margin: "0 0 0 10px", fontSize: "32px" }}>Profile</Heading>
              </Appear>
              <div
                style={{
                  display: "flex",
                  width: "300px",
                  justifyContent: "flex-end",
                }}
              >
                <Link to="/shop">
                  <Button animate layer="primary">
                    <i className="mdi mdi-store-outline" /> Return to Shop
                  </Button>
                </Link>
              </div>
            </div>
          </Header>

          <Row>
            <Col s={6}>
              <Frame layer={"primary"} animate level={0} corners={4} style={{ margin: 20 }}>
                <Content style={{ padding: 20 }}>
                  <h1 style={{ textAlign: "center" }}>Purchase History</h1>
                  <Line animate />
                  <Table headers={["Order Number", "Ordered Items", "Order Total"]} dataset={entries} />
                </Content>
              </Frame>
            </Col>
            <Col style={{ display: "flex", justifyContent: "center" }} s={6}>
              <Image
                style={{ margin: 0, width: "50%", marginTop: 20 }}
                alt="Profile Picture"
                animate
                resources={user.picture}
              >
                <p style={{ margin: "10px 0", "word-wrap": "break-word" }}>{user.name}</p>
                <p style={{ margin: "10px 0", "word-wrap": "break-word" }}>{user.email}</p>
              </Image>
            </Col>
          </Row>
        </div>
      ) : null}
    </>
  );
};

export default Profile;
