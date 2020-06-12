import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import './index.css';
import App from './App';
import { Arwes, ThemeProvider, createTheme } from 'arwes';
import image1 from './images/background.jpg';
import image2 from './images/glow.png';
import * as serviceWorker from './serviceWorker';
import { Auth0Provider } from './react-auth0-spa';
import config from './auth_config.json';
import history from './utils/history';

const theme = createTheme();
theme.animTime = 750;

const onRedirectCallback = (appState) => {
  history.push(
    appState && appState.targetUrl
      ? appState.targetUrl
      : window.location.pathname
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain={config.domain}
      client_id={config.clientId}
      redirect_uri={window.location.origin}
      audience={config.audience}
      onRedirectCallback={onRedirectCallback}>
      <ThemeProvider theme={theme}>
        <Arwes animate background={image1} pattern={image2}>
          {/* Don't forget to include the history module */}
          <Router history={history}>
            <App />
          </Router>
        </Arwes>
      </ThemeProvider>
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
