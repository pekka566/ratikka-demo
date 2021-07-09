import React from "react"
import ReactDOM from "react-dom"
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client"
import { App } from "./components/App"

const client = new ApolloClient({
  uri: "https://api.digitransit.fi/routing/v1/routers/waltti/index/graphql",
  cache: new InMemoryCache()
})

/*
client
  .query({
    query: GET_DATA
  })
  .then((result) => console.log(result))
*/

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
)
