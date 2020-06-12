import React from 'react';
import { Frame, Line, Content, Appear } from 'arwes';

const ShipCardInCart = ({ ship }) => {
  const { name, modelLink } = ship;

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
        src={modelLink}
        alt="A 3D model of a spaceship"
        auto-rotate
        camera-controls
        interaction-prompt="none"></model-viewer>
      <Line animate />
      <Content style={{ margin: '20px' }}>
        <Appear animate>
          <div>
            <h1>{name}</h1>
          </div>
        </Appear>
      </Content>
    </Frame>
  );
};

export default ShipCardInCart;
