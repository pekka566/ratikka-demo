import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client"
import React from "react"
import { createRoot } from "react-dom/client"
import { App } from "./components/App"

const client = new ApolloClient({
  uri:
    import.meta.env.VITE_GRAPHQL_URI ||
    "https://api.digitransit.fi/routing/v1/routers/waltti/index/graphql",
  cache: new InMemoryCache()
})

const root = createRoot(document.getElementById("root")!)
root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
)
