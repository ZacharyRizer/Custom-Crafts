import React, { useState, useEffect, useContext } from 'react';
import createAuth0Client from '@auth0/auth0-spa-js';
import axios from 'axios';
import { apiBaseUrl } from './config';

const DEFAULT_REDIRECT_CALLBACK = () =>
  window.history.replaceState({}, document.title, window.location.pathname);

export const Auth0Context = React.createContext();
export const useAuth0 = () => useContext(Auth0Context);
export const Auth0Provider = ({
  children,
  onRedirectCallback = DEFAULT_REDIRECT_CALLBACK,
  ...initOptions
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState();
  const [user, setUser] = useState();
  const [auth0Client, setAuth0] = useState();
  const [loading, setLoading] = useState(true);
  const [popupOpen, setPopupOpen] = useState(false);

  useEffect(() => {
    const initAuth0 = async () => {
      const auth0FromHook = await createAuth0Client(initOptions);
      setAuth0(auth0FromHook);

      if (
        window.location.search.includes('code=') &&
        window.location.search.includes('state=')
      ) {
        const { appState } = await auth0FromHook.handleRedirectCallback();
        onRedirectCallback(appState);
      }

      const isAuthenticated = await auth0FromHook.isAuthenticated();

      setIsAuthenticated(isAuthenticated);

      // Does this only run on explicit login???
      if (isAuthenticated) {
        let user = await auth0FromHook.getUser();
        const token = await auth0FromHook.getTokenSilently();

        // check local storage before posting to db
        const storedUser = JSON.parse(
          localStorage.getItem('custom_crafts_userObj')
        );

        if (storedUser && storedUser !== 'undefined') {
          setUser(storedUser);
        } else {
          const res = await axios({
            url: `${apiBaseUrl}`,
            headers: {
              Authorization: `Bearer ${token}`,
            },
            method: 'post',
            data: {
              query: `
              mutation {
                addCustomer(name: "${user.nickname}", email: "${user.email}", auth0Id: "${user.sub}", picture: "${user.picture}"){
                  id
                }
              }`,
            },
          });
          if (res.data.data.addCustomer) {
            const id = res.data.data.addCustomer.id;
            user.id = id;
            localStorage.setItem('custom_crafts_userObj', JSON.stringify(user));
          }
          setUser(user);
        }
      }
      setLoading(false);
    };
    initAuth0();
  }, []);

  const loginWithPopup = async (params = {}) => {
    setPopupOpen(true);
    try {
      await auth0Client.loginWithPopup(params);
    } catch (error) {
      console.error(error);
    } finally {
      setPopupOpen(false);
    }
    const user = await auth0Client.getUser();
    setUser(user);
    setIsAuthenticated(true);
  };

  const handleRedirectCallback = async () => {
    setLoading(true);
    await auth0Client.handleRedirectCallback();
    const user = await auth0Client.getUser();
    setLoading(false);
    setIsAuthenticated(true);
    setUser(user);
  };
  return (
    <Auth0Context.Provider
      value={{
        isAuthenticated,
        user,
        loading,
        popupOpen,
        loginWithPopup,
        handleRedirectCallback,
        getIdTokenClaims: (...p) => auth0Client.getIdTokenClaims(...p),
        loginWithRedirect: (...p) => auth0Client.loginWithRedirect(...p),
        getTokenSilently: (...p) => auth0Client.getTokenSilently(...p),
        getTokenWithPopup: (...p) => auth0Client.getTokenWithPopup(...p),
        logout: (...p) => auth0Client.logout(...p),
      }}>
      {children}
    </Auth0Context.Provider>
  );
};
