import React from 'react';
import { useAuth0 } from '../react-auth0-spa';
import { Link } from 'react-router-dom';
import { Frame, Heading, Button } from "arwes";


const NavBar = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  return (
    <div>
      <Frame show={true} animate={true} level={3} corners={4} layer='primary'><Heading style={{ padding: "20px 40px", fontSize: "32px" }} node='h1'>Cruising Crafts
      {'    '}
          {!isAuthenticated && (
            <Button onClick={() => loginWithRedirect({})} animate layer='success'>
              <i className='mdi mdi-chemical-weapon' /> Login
            </Button>
          )}
          {isAuthenticated && 
            <Button onClick={() => logout()} animate layer='alert'>Log-out <i className='mdi mdi-robot' />
          </Button>}
          {'    '}
          {isAuthenticated && (
            <span>
            <Button onClick={() => (window.location.href = "/")} animate layer='success'><Link to="/">Home</Link>&nbsp;</Button>
            {'    '}
            <Button onClick={() => (window.location.href = "/")} animate layer='success'><Link to="/profile">Profile</Link></Button>
            </span>
          )}
        </Heading>
      </Frame>
    </div>
  );
};

export default NavBar;
