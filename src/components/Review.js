import React, { useEffect } from "react";
import { useAuth0 } from "../react-auth0-spa";
import { apiBaseUrl } from "../config";
import Axios from "axios";
import { Frame, Content, Image, Line } from "arwes";

// component to create new review
const Review = () => {
  const { getTokenSilently, user } = useAuth0();

  useEffect(() => {
    if (!user) return;
    // mutation params hard-coded for testing
    // these values will need to be retrieved dynamically

    const rating = 5;
    const shipId = 9;
    const description = "Test review";

    const token = getTokenSilently();

    const rs = `
            mutation ($customerId: Int!, $rating:Int!, $shipId:Int!, $description:String!){
                addReview(customerId:$customerId,rating:$rating,shipId:$shipId,description:$description){
                description
                rating
                id
                customerId
                }
            }
        `;

    (async () => {
      const reviewRes = await Axios({
        url: `${apiBaseUrl}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        method: "post",
        data: {
          query: rs,
          variables: {
            customerId: user.id,
            rating,
            shipId,
            description,
          },
        },
      });
      const data = reviewRes.data.data;
      console.log("data from reviewRes: ", data);
    })();
  }, [user]);

  return (
    <Frame layer={"primary"} animate level={0} corners={0} style={{ height: "100%", marginBottom: 20 }}>
      <Frame
        layer={"primary"}
        animate
        level={0}
        corners={0}
        style={{ margin: 10, height: 388, maxHeight: 388, width: "75%" }}
      >
        <div style={{ overflowY: "scroll", height: 388 }}>
          <form>
            <textarea
              placeholder="Type your Galactic-Government-Approved thoughts here..."
              onFocus={(e) => {
                e.currentTarget.setAttribute("onfocus", "this.placeholder = ''");
              }}
              onBlur={(e) => {
                e.currentTarget.setAttribute(
                  "onblur",
                  "this.placeholder = 'Type your Galactic-Government-Approved thoughts here...'"
                );
              }}
              style={{
                padding: 20,
                backgroundColor: "transparent",
                outline: "none",
                border: "none",
                color: "#26dafd",
                resize: "none",
                fontFamily: '"Titillium Web", "sans-serif"',
                fontSize: 21,
                width: 500,
              }}
            ></textarea>
          </form>
        </div>
      </Frame>
    </Frame>
  );
};

export default Review;
