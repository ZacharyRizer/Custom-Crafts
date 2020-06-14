import React from 'react';
import { Frame, Line, Content, Appear, Footer } from 'arwes';

const ShipCardInCart = (props) => {
  const { color, modelLink, name } = props.ship;
  const displayColor = color[0].toUpperCase() + color.substring(1);
  const shipLink = modelLink.split('_')[0];
  const colorSpecificLink = `${shipLink}_${color}.glb`;

  return (
    <Frame
      layer={'primary'}
      animate
      level={0}
      corners={4}
      style={{ margin: '20px 0 20px 0', width: 450, maxWidth: 450 }}>
      <model-viewer
        style={{
          backgroundColor: 'transparent',
          height: '400px',
          width: '100%',
          margin: 'auto',
          '--poster-color': 'transparent',
          '--progress-bar-color': 'transparent',
          '--progress-mask': 'transparent',
        }}
        src={colorSpecificLink}
        alt="A 3D model of a spaceship"
        auto-rotate
        camera-controls
        auto-rotate-delay={1000}
        interaction-prompt="none"></model-viewer>
      <Content style={{ margin: '20px' }}>
        <Footer style={{ backgroundColor: 'transparent' }} animate>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
            }}>
            <p>{name}</p>
            <p>
              {displayColor} ( x {props.quantity})
            </p>
          </div>
        </Footer>
      </Content>
    </Frame>
  );
};

export default ShipCardInCart;
