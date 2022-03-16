import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import 'antd/dist/antd.css';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
});

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  )
}

ReactDOM.render(
  <Root />,
  document.getElementById('root')
);
