import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// use @apollo/client
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://127.0.0.1:4001/graphql",
  cache: new InMemoryCache(),
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

// use urql
// import { createClient, Provider } from 'urql';

// const client = createClient({
//   url: 'http://127.0.0.1:4001/graphql',
// });

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <Provider value={client}>
//     <App />
//   </Provider>
// );

// use react-query
// import { QueryClient, QueryClientProvider } from "react-query";

// const client = new QueryClient();

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <QueryClientProvider client={client}>
//     <App />
//   </QueryClientProvider>
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
