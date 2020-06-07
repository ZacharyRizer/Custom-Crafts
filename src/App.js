import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import ApolloTest from './components/ApolloTest'

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql'
})

function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <h1>Custom Crafts</h1>
        <h2>This rendered</h2>
        <Route path='/apollo-test' component={ApolloTest} />
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
