import React, { useState, useEffect } from "react";
import { apiBaseUrl } from "../config";
import Axios from "axios";
import { Frame, Content, Image, Line } from "arwes";

// component to create new review
const AllReviews = (props) => {
  const reviews = props.reviews;
  const [stars, setStars] = useState([[]]);

  useEffect(() => {
    let finalList = [];
    reviews.forEach((review) => {
      let subList = [];
      for (let i = 0; i < 5; i++) {
        if (i <= review.rating - 1) {
          subList.push(<i className="mdi mdi-star" />);
        } else {
          subList.push(<i className="mdi mdi-star-outline" />);
        }
      }
      finalList.push(subList);
    });
    setStars(finalList);
  }, [reviews]);

  return (
    <Frame
      layer={"primary"}
      animate
      level={0}
      corners={0}
      style={{ height: "100%", marginBottom: 20 }}
      children={{ style: { color: "red" } }}
    >
      <div style={{ height: 388, maxHeight: 388, padding: 20, overflowY: "scroll" }}>
        {reviews.length > 0 ? (
          reviews.map((review, index) => (
            <Content>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-start" }}>
                {review ? (
                  <Image resources={review.customer.picture} style={{ width: 32, height: 32 }} />
                ) : (
                  <Image resources="/android-chrome-192x192.png" style={{ width: 32, height: 32 }} />
                )}

                <blockquote>{review.customer.name}</blockquote>
              </div>
              <div>{stars[index]}</div>
              <p>{review.description}</p>
              <Line animate />
            </Content>
          ))
        ) : (
          <Content>
            <h1>No Reviews Yet!</h1>
          </Content>
        )}
      </div>
    </Frame>
  );
};

export default AllReviews;
