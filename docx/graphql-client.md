# Config graphql client

## 👍 Install dependencies

```bash
npm install @apollo/client graphql
```
```bash
npm install urql graphql
```
```bash
npm install react-query graphql-request
```

## 👍 Config
### 1. Use `@apollo/client`
File `index.js`
```javascript
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
```

File `App.js`

```javascript
import { useQuery, gql } from "@apollo/client";

const USERS = gql`
  {
    users {
      id,
      login,
      avatar_url,
    }
  }
`;

function App() {
  const { data, loading, error } = useQuery(USERS);

  if (loading) return "Loading...";
  if (error) return <pre>{error.message}</pre>

  return (
    <div className="App">
      Start Graphql
      <h1>Users</h1>
      <ul>
        {data.users.map((c) => (
          <li key={c.id}>{c.login}</li>
        ))}
      </ul>
    </div>
  );
}
```


### 2. Use `urql`
File `index.js`
```javascript
import { createClient, Provider } from 'urql';

const client = createClient({
  url: 'http://127.0.0.1:4001/graphql',
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider value={client}>
    <App />
  </Provider>
);
```

File `App.js`

```javascript
import { useQuery } from 'urql';

const USERS = `
  {
    users {
      id,
      login,
      avatar_url,
    }
  }
`;

function App() {
  const [{ data, fetching: loading, error }] = useQuery({
    query: USERS,
  });

  if (loading) return "Loading...";
  if (error) return <pre>{error.message}</pre>

  return (
    <div className="App">
      Start Graphql
      <h1>Users</h1>
      <ul>
        {data.users.map((c) => (
          <li key={c.id}>{c.login}</li>
        ))}
      </ul>
    </div>
  );
}
```

### 3. Use `react-query` and `graphql-request` or `axios` or `fetch`
File `index.js`
```javascript
import { QueryClient, QueryClientProvider } from "react-query";

const client = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <QueryClientProvider client={client}>
    <App />
  </QueryClientProvider>
);
```

File `App.js`

```javascript
import { request, gql } from "graphql-request";
import { useQuery } from "react-query";
import axios from "axios";

const USERS = `
  {
    users {
      id,
      login,
      avatar_url,
    }
  }
`;

function App() {
  const { data, isLoading: loading, error } = useQuery("users", () => {
    return request("http://127.0.0.1:4001/graphql", USERS);
  });

  const { data, isLoading: loading, error } = useQuery("users", () => {
    return axios({
      url: "http://127.0.0.1:4001/graphql",
      method: "POST",
      data: {
        query: USERS
      }
    }).then(response => response.data.data);
  });
  const { data, isLoading: loading, error } = useQuery("launches", () => {
    return fetch("http://127.0.0.1:4001/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: USERS })
    })
      .then((response) => {
        if (response.status >= 400) {
          throw new Error("Error fetching data");
        } else {
          return response.json();
        }
      })
      .then((data) => data.data);
  });

  if (loading) return "Loading...";
  if (error) return <pre>{error.message}</pre>

  return (
    <div className="App">
      Start Graphql
      <h1>Users</h1>
      <ul>
        {data.users.map((c) => (
          <li key={c.id}>{c.login}</li>
        ))}
      </ul>
    </div>
  );
}
```