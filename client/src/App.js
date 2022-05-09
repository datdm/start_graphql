import './App.css';
// use @apollo/client
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

// use urql
// import { useQuery } from 'urql';
// const USERS = `
//   {
//     users {
//       id,
//       login,
//       avatar_url,
//     }
//   }
// `;

// use react-query graphql-request
// import { request, gql } from "graphql-request";
// import { useQuery } from "react-query";
// import axios from "axios";
// const USERS = gql`
//   {
//     users {
//       id,
//       login,
//       avatar_url,
//     }
//   }
// `;

function App() {
  // use @apollo/client
  const { data, loading, error } = useQuery(USERS);

  // use urql
  // const [{ data, fetching: loading, error }] = useQuery({
  //   query: USERS,
  // });

  // use react-query graphql-request
  // const { data, isLoading: loading, error } = useQuery("users", () => {
  //   return request("http://127.0.0.1:4001/graphql", USERS);
  // });
  // const { data, isLoading: loading, error } = useQuery("users", () => {
  //   return axios({
  //     url: "http://127.0.0.1:4001/graphql",
  //     method: "POST",
  //     data: {
  //       query: USERS
  //     }
  //   }).then(response => response.data.data);
  // });
  // const { data, isLoading: loading, error } = useQuery("launches", () => {
  //   return fetch("http://127.0.0.1:4001/graphql", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ query: USERS })
  //   })
  //     .then((response) => {
  //       if (response.status >= 400) {
  //         throw new Error("Error fetching data");
  //       } else {
  //         return response.json();
  //       }
  //     })
  //     .then((data) => data.data);
  // });

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
