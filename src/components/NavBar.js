import React, {useContext} from 'react';
import {Context} from '../Context'
import { useAuth0 } from '../react-auth0-spa';
import { Link } from 'react-router-dom';
import { Frame, Heading, Button } from "arwes";
import {TextField} from '@material-ui/core';


const NavBar = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
  const {numItems} = useContext(Context)

  return (
    <Frame animate level={1} corners={6} layer='primary'>
      <div className='navbar'>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <Heading style={{ margin: "10px", padding: "15px", fontSize: "32px" }} node='h1'>Custom Crafts</Heading>
        </Link>
        <TextField color='green' placeholder='Search For Ships!' />
        {!isAuthenticated && (
        <div className='navbar_buttons'>
          <Button onClick={() => loginWithRedirect({})} animate layer='success' >Login</Button>
          <Link to="/cart">
            <Button animate disabled >Cart: {numItems}</Button>
          </Link>
        </div>
        )}
        {isAuthenticated && (
        <div className='navbar_buttons'>
          <Link to="/profile">
            <Button animate layer='success'>Profile</Button>
          </Link>
          <Link to="/cart">
            <Button animate disabled >Cart: {numItems}</Button>
          </Link>
          <Button onClick={() => logout()} animate layer='alert'>Log-out</Button>
        </div>
        )}
      </div>
    </Frame>
  );
};

export default NavBar;
