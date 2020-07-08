import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Row,
  Col,
  Frame,
  Button,
  Footer,
  Line,
  Content,
  Words,
  Heading,
} from 'arwes';

const Splash = () => {
  const [shipNumber, setShipNumber] = useState(1);
  const [shipColor, setShipColor] = useState('blue');

  useEffect(() => {
    let i = 1;
    let j = 0;
    const color = ['blue', 'green', 'orange', 'red'];
    const numberOfShips = 20;
    const interval = setInterval(() => {
      i++;
      if (i > numberOfShips) {
        i = 1;
      }
      setShipNumber(i);
    }, 3000);
    const colorSet = setInterval(() => {
      j++;
      if (j > color.length) {
        j = 0;
      }
      setShipColor(color[j]);
    }, 3000);
    return () => {
      clearInterval(interval);
      clearInterval(colorSet);
    };
  }, []);

  return (
    <>
      <Row style={{ padding: '0 20px 20px 20px' }}>
        <Col s={12} m={6}>
          <Content>
            <h1
              style={{
                fontSize: 100,
                margin: 0,
                textAlign: 'center',
                verticalAlign: 'middle',
              }}>
              The Galaxy's
            </h1>
            <h1
              style={{
                fontSize: 100,
                margin: 0,
                textAlign: 'center',
                verticalAlign: 'middle',
              }}>
              Finest Ships
            </h1>
          </Content>
          <Line animate />
          <Content>
            <Row>
              <Col s={12} m={6}>
                <Frame
                  layer={'primary'}
                  animate
                  level={0}
                  corners={2}
                  style={{ marginBottom: 20 }}>
                  <p
                    style={{
                      margin: 0,
                      textAlign: 'center',
                      fontStyle: 'italic',
                    }}>
                    Prices set to Stun,
                  </p>
                  <p
                    style={{
                      margin: 0,
                      textAlign: 'center',
                      fontStyle: 'italic',
                    }}>
                    Not Kill!
                  </p>
                </Frame>
              </Col>
              <Col s={12} m={6}>
                <Frame
                  layer={'primary'}
                  animate
                  level={0}
                  corners={2}
                  style={{ marginBottom: 20 }}>
                  <p
                    style={{
                      margin: 0,
                      textAlign: 'center',
                      fontStyle: 'italic',
                    }}>
                    Best Deals
                  </p>
                  <p
                    style={{
                      margin: 0,
                      textAlign: 'center',
                      fontStyle: 'italic',
                    }}>
                    This Side of the Nebula!
                  </p>
                </Frame>
              </Col>
              <Col s={12} m={6}>
                <Frame
                  layer={'primary'}
                  animate
                  level={0}
                  corners={2}
                  style={{ marginBottom: 0 }}>
                  <p
                    style={{
                      margin: 0,
                      textAlign: 'center',
                      fontStyle: 'italic',
                    }}>
                    "Glaxnar's Favorite!"
                  </p>
                  <p
                    style={{
                      margin: 0,
                      textAlign: 'center',
                      fontStyle: 'italic',
                    }}>
                    - Glaxnar The Devourer
                  </p>
                </Frame>
              </Col>
              <Col s={12} m={6}>
                <Frame
                  layer={'primary'}
                  animate
                  level={0}
                  corners={2}
                  style={{ marginBottom: 0 }}>
                  <div
                    style={{
                      margin: 0,
                      textAlign: 'center',
                      fontStyle: 'italic',
                    }}>
                    "
                    <i className="mdi mdi-star" />
                    <i className="mdi mdi-star" />
                    <i className="mdi mdi-star" />
                    <i className="mdi mdi-star" />
                    <i className="mdi mdi-star" />"
                  </div>
                  <p
                    style={{
                      margin: 0,
                      textAlign: 'center',
                      fontStyle: 'italic',
                    }}>
                    - Spaceships Monthly
                  </p>
                </Frame>
              </Col>
            </Row>
          </Content>
          <Line animate />
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              paddingTop: 90,
            }}>
            <Link to="/shop">
              <Button corners={4} layer={'secondary'} animate>
                <div
                  style={{
                    padding: 20,
                    display: 'flex',
                    alignItems: 'center',
                  }}>
                  <Heading
                    style={{ margin: 0, fontSize: 50, textShadow: 'none' }}>
                    <Words layer="secondary">Let's Fly</Words>
                  </Heading>
                  <i
                    style={{ fontSize: 75, paddingLeft: 20 }}
                    class="mdi mdi-transfer-right"
                  />
                </div>
              </Button>
            </Link>
          </div>
        </Col>
        <Col s={12} m={6}>
          <Frame
            layer={'primary'}
            animate
            level={0}
            corners={4}
            style={{ marginBottom: 20 }}>
            <model-viewer
              style={{
                backgroundColor: 'transparent',
                height: '800px',
                width: '100%',
                margin: 'auto',
                '--poster-color': 'transparent',
                '--progress-bar-color': 'transparent',
                '--progress-mask': 'transparent',
              }}
              src={`/spaceships/ship${shipNumber}_${shipColor}.glb`}
              alt="A 3D model of a spaceship"
              auto-rotate-delay={10}
              auto-rotate
              camera-controls
              exposure={0.75}
              interaction-prompt="none"></model-viewer>
          </Frame>
        </Col>
      </Row>
      <Footer
        animate
        style={{
          position: 'fixed',
          left: 0,
          bottom: 0,
          width: '100%',
          zIndex: 100,
        }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-evenly',
            alignItems: 'center',
          }}>
          <p>Site Created By:</p>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <p>Abdullah Wafy</p>
            <a href="https://github.com/Seraph9">
              <Button style={{ marginRight: 10, marginLeft: 10 }} animate>
                <i className="mdi mdi-github" />
              </Button>
            </a>
            <a href="https://www.linkedin.com/in/abdullah-wafy/">
              <Button
                layer="secondary"
                style={{ marginRight: 10, marginLeft: 10 }}
                animate>
                <i className="mdi mdi-linkedin" />
              </Button>
            </a>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <p>Ian Magenta</p>
            <a href="https://github.com/ianmagenta">
              <Button style={{ marginRight: 10, marginLeft: 10 }} animate>
                <i className="mdi mdi-github" />
              </Button>
            </a>
            <a href="https://www.linkedin.com/in/ianmagenta/">
              <Button
                layer="secondary"
                style={{ marginRight: 10, marginLeft: 10 }}
                animate>
                <i className="mdi mdi-linkedin" />
              </Button>
            </a>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <p>William Schrader</p>
            <a href="https://github.com/wfschrad">
              <Button style={{ marginRight: 10, marginLeft: 10 }} animate>
                <i className="mdi mdi-github" />
              </Button>
            </a>
            <a href="https://www.linkedin.com/in/william-schrader-7ba014199/">
              <Button
                layer="secondary"
                style={{ marginRight: 10, marginLeft: 10 }}
                animate>
                <i className="mdi mdi-linkedin" />
              </Button>
            </a>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <p>Zachary Rizer</p>
            <a href="https://github.com/ZacharyRizer">
              <Button style={{ marginRight: 10, marginLeft: 10 }} animate>
                <i className="mdi mdi-github" />
              </Button>
            </a>
            <a href="https://www.linkedin.com/in/zachary-rizer/">
              <Button
                layer="secondary"
                style={{ marginRight: 10, marginLeft: 10 }}
                animate>
                <i className="mdi mdi-linkedin" />
              </Button>
            </a>
          </div>
        </div>
      </Footer>
    </>
  );
};

export default Splash;
