import React, { useEffect, useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth0 } from '../react-auth0-spa';

export const AdminRoute = ({ component: Component, path, ...rest }) => {
  const [role, setRole] = useState();
  const { user } = useAuth0();
  const roleKey = 'http://customcraft/roles';

  useEffect(() => {
    if (user) {
      setRole(user[roleKey]);
    }
  }, [user]);

  return (
    <>
      {role ? (
        <Route
          path={path}
          render={(props) =>
            role === 'admin' ? <Component {...props} /> : <Redirect to="/" />
          }
        />
      ) : null}
    </>
  );
};

export default AdminRoute;
