import React, { useEffect } from "react";
import { apiBaseUrl } from "../config";
import Axios from "axios";
import { Frame, Content, Image, Line } from "arwes";

// component to create new review
const AllReviews = (props) => {
    const reviews = props.reviews;
    console.log("this is the review object:", reviews);

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
                {reviews &&
                    reviews.map((review) => (
                        <Content>
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-start" }}>
                                {(review && review.customer) ? (
                                    <>
                                        <Image resources={review.customer.picture} style={{ width: 32, height: 32 }} />
                                        <blockquote>{review.customer.name}</blockquote>
                                    </>
                                ) : (<>
                                    <Image resources="/android-chrome-192x192.png" style={{ width: 32, height: 32 }} />


                                </>
                                    )}
                            </div>
                            <div>
                                <i className="mdi mdi-star" />
                                <i className="mdi mdi-star" />
                                <i className="mdi mdi-star" />
                                <i className="mdi mdi-star" />
                                <i className="mdi mdi-star" />
                            </div>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                                dolore magna aliqua. Donec et odio pellentesque diam volutpat. Ac tincidunt vitae semper quis lectus
                                nulla at volutpat diam.
              </p>
                            <Line animate />
                        </Content>
                    ))}
            </div>
        </Frame>
    );
};

export default AllReviews;
