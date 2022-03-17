import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import UserPageWrapper from './components/UserPageWrapper';
import ApolloClient from 'apollo-boost';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import 'antd/dist/antd.css';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
});

const Root = () => {

  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<App />} />
          <Route path='/user/:id' element={<UserPageWrapper />} />
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  )
}

ReactDOM.render(
  <Root />,
  document.getElementById('root')
);
