import './App.css';
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

export default App;
