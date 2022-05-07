# Config graphql client

## 👍 Install dependencies

```bash
npm install @apollo/client graphql
```

## 👍 Config
### File `index.js`
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

### File `App.js`

```typescript
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
