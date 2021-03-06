import React, { useEffect, useState, useRef } from 'react';
import { useAuth0 } from '../react-auth0-spa';
import { apiBaseUrl } from '../config';
import Axios from 'axios';
import { Frame, Content, Image, Line, Link } from 'arwes';
import Button from 'arwes/lib/Button';

// component to create new review
const Review = (props) => {
  const [reviews, setReviews] = useState([]);
  const [write, setWrite] = useState(false);
  const [stars, setStars] = useState(0);
  const [totalStars, setTotalStars] = useState([[]]);
  const [text, setText] = useState('');
  const [required, setRequired] = useState(false);
  let [rating, setRating] = useState([]);
  const { loginWithRedirect, getTokenSilently, user } = useAuth0();
  const reviewText = useRef();
  const shipId = props.shipId;

  useEffect(() => {
    if (!user) return;
    // mutation params hard-coded for testing
    // these values will need to be retrieved dynamically
  }, [user]);

  const handleWriteClick = (e) => {
    setStars(0);
    setWrite(!write);
  };

  const handleReviewSubmit = async () => {
    if (!stars) {
      return setRequired(true);
    }
    if (!user) {
      return loginWithRedirect({});
    } //add pop-up message???
    const description = reviewText.current.value;
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
        method: 'post',
        data: {
          query: rs,
          variables: {
            customerId: user.id,
            rating: stars.toString(),
            shipId,
            description,
          },
        },
      });

      const revString = `
        {
          reviews(shipId:${shipId}){
            customer{
              name
              picture
            }
            description
            rating
          }
        }
      `;

      const allReviewRes = await Axios({
        url: apiBaseUrl,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        method: 'post',
        data: {
          query: revString,
        },
      });
      const newData = allReviewRes.data.data.reviews;
      console.log('review res :', newData);
      setReviews(newData);
      setWrite(false);
    })();
  };

  useEffect(() => {
    (async () => {
      const revString = `
        {
          reviews(shipId:${shipId}){
            customer{
              name
              picture
            }
            description
            rating
          }
        }
      `;

      const allReviewRes = await Axios({
        url: apiBaseUrl,

        method: 'post',
        data: {
          query: revString,
        },
      });
      const newData = allReviewRes.data.data.reviews;
      console.log('review res :', newData);
      setReviews(newData);
      setWrite(false);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const revString = `
        {
          reviews(shipId:${shipId}){
            customer{
              name
              picture
            }
            description
            rating
          }
        }
      `;
      const allReviewRes = await Axios({
        url: apiBaseUrl,
        method: 'post',
        data: {
          query: revString,
        },
      });
      const newData = allReviewRes.data.data.reviews;
      console.log('review res :', newData);
      setReviews(newData);
      setWrite(false);
    })();
  }, []);

  useEffect(() => {
    if (reviews.length > 0) {
      let ratingNumber = reviews.map((r) => r.rating);
      ratingNumber = Math.round(
        ratingNumber.reduce((a, b) => a + b) / ratingNumber.length
      );
      let finalList = [];
      for (let i = 0; i < 5; i++) {
        if (i <= ratingNumber - 1) {
          finalList.push(<i key={i} className="mdi mdi-star" />);
        } else {
          finalList.push(<i key={i} className="mdi mdi-star-outline" />);
        }
      }
      setRating(finalList);
    }

    let finalList = [];
    reviews.forEach((review) => {
      let subList = [];
      for (let i = 0; i < 5; i++) {
        if (i <= review.rating - 1) {
          subList.push(<i key={i} className="mdi mdi-star" />);
        } else {
          subList.push(<i key={i} className="mdi mdi-star-outline" />);
        }
      }
      finalList.push(subList);
    });
    setTotalStars(finalList);
  }, [reviews]);

  useEffect(() => {
    if (!reviewText.current) return;
    for (let i = 1; i <= 5; i++) {
      const element = document.getElementById(i);
      if (!element) return;
      if (i > stars) {
        element.innerHTML = '<i class="mdi mdi-star-outline" />';
      } else {
        element.innerHTML = '<i class="mdi mdi-star" />';
      }
    }
    reviewText.current.value = text;
  }, [stars, text]);

  const handleStars = (e) => {
    e.preventDefault();
    setText(reviewText.current.value);
    const starChoice = Number.parseInt(e.currentTarget.id, 10);
    setStars(starChoice);
  };

  const InnerReview = () => {
    return (
      <Frame
        layer={'primary'}
        animate
        level={0}
        corners={0}
        style={{ height: 397 }}>
        <div style={{ width: '100%', textAlign: 'center', padding: 10 }}>
          <Link id={1} onClick={handleStars}>
            <i className="mdi mdi-star-outline" />
          </Link>
          <Link id={2} onClick={handleStars}>
            <i className="mdi mdi-star-outline" />
          </Link>
          <Link id={3} onClick={handleStars}>
            <i className="mdi mdi-star-outline" />
          </Link>
          <Link id={4} onClick={handleStars}>
            <i className="mdi mdi-star-outline" />
          </Link>
          <Link id={5} onClick={handleStars}>
            <i className="mdi mdi-star-outline" />
          </Link>
        </div>
        <Line style={{ margin: 0 }} animate />
        <textarea
          ref={reviewText}
          placeholder="Type your Galactic-Government-Approved thoughts here..."
          onFocus={(e) => {
            e.preventDefault();
            e.currentTarget.setAttribute('onfocus', "this.placeholder = ''");
          }}
          onBlur={(e) => {
            e.preventDefault();
            e.currentTarget.setAttribute(
              'onblur',
              "this.placeholder = 'Type your Galactic-Government-Approved thoughts here...'"
            );
          }}
          style={{
            padding: 20,
            backgroundColor: 'transparent',
            outline: 'none',
            border: 'none',
            color: '#26dafd',
            resize: 'none',
            fontFamily: '"Titillium Web", "sans-serif"',
            fontSize: 21,
            width: '100%',
            height: '328px',
          }}></textarea>
      </Frame>
    );
  };

  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '20px 20px 0px 20px',
        }}>
        <div>
          {write ? (
            <Button
              style={{ marginRight: 20 }}
              buttonProps={{ onClick: handleWriteClick }}
              animate
              layer="primary">
              Cancel
            </Button>
          ) : (
            <Button
              buttonProps={{ onClick: handleWriteClick }}
              animate
              layer="secondary">
              Write Review
            </Button>
          )}
          {write &&
            (stars > 0 ? (
              <Button
                buttonProps={{ onClick: handleReviewSubmit }}
                animate
                layer="secondary">
                Submit Review
              </Button>
            ) : (
              <Button
                style={{ pointerEvents: 'none' }}
                disabled
                buttonProps={{ onClick: handleReviewSubmit }}
                animate
                layer="secondary">
                Submit Review
              </Button>
            ))}
        </div>
        <Content>
          <blockquote style={{ margin: 0 }}>
            {reviews.length > 0 ? (
              <>{rating}</>
            ) : (
              <>
                <i className="mdi mdi-star-outline" />
                <i className="mdi mdi-star-outline" />
                <i className="mdi mdi-star-outline" />
                <i className="mdi mdi-star-outline" />
                <i className="mdi mdi-star-outline" />
              </>
            )}
          </blockquote>
        </Content>
      </div>
      <div
        style={{
          height: 450,
          maxHeight: 450,
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
        }}>
        {write ? (
          <InnerReview />
        ) : (
          <>
            <Frame
              layer={'primary'}
              animate
              level={0}
              corners={0}
              style={{ height: '100%', marginBottom: 20 }}>
              <div
                style={{
                  height: 395,
                  maxHeight: 395,
                  padding: 20,
                  overflowY: 'scroll',
                }}>
                {reviews.length > 0 ? (
                  reviews.map((review, index) => (
                    <Content key={index}>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'flex-start',
                        }}>
                        {review ? (
                          <Image
                            resources={review.customer.picture}
                            style={{ width: 32, height: 32 }}
                          />
                        ) : (
                          <Image
                            resources="/android-chrome-192x192.png"
                            style={{ width: 32, height: 32 }}
                          />
                        )}

                        <blockquote>{review.customer.name}</blockquote>
                      </div>
                      <div>{totalStars[index]}</div>
                      <p>{review.description}</p>
                      <Line animate />
                    </Content>
                  ))
                ) : (
                  <Content style={{ textAlign: 'center' }}>
                    <h1 style={{ margin: 0 }}>No Reviews Yet</h1>
                    <p
                      style={{
                        margin: 0,
                        textAlign: 'center',
                        fontStyle: 'italic',
                      }}>
                      Be the first!
                    </p>
                    <Line animate />
                  </Content>
                )}
              </div>
            </Frame>
          </>
        )}
      </div>
    </>
  );
};

export default Review;
