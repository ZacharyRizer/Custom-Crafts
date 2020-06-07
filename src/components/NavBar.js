import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import auth0Client from '../Auth';

function NavBar(props) {
  const signOut = () => {
    console.log(auth0Client.getProfile());

    auth0Client.signOut();
    props.history.replace('/');
  };

  return (
    <nav>
      {!auth0Client.isAuthenticated() && (
        <button onClick={auth0Client.signIn}>Sign In</button>
      )}
      {auth0Client.isAuthenticated() && (
        <div>
          <label>{auth0Client.getProfile().name}</label>
          <button
            onClick={() => {
              signOut();
            }}>
            Sign Out
          </button>
        </div>
      )}
    </nav>
  );
}

export default withRouter(NavBar);
