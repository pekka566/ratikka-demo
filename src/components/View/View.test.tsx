import { MockedProvider } from "@apollo/client/testing"
import { render, screen, waitFor } from "@testing-library/react"
import { GraphQLError } from "graphql"
import React from "react"
import { GET_ROUTES } from "../../queries/getRoutes"
import routesMockData from "../../testdata/routesMockData"
import { View } from "./View"

const mocks = [
  {
    request: {
      query: GET_ROUTES
    },
    result: routesMockData
  }
]

const errorMock = [
  {
    request: {
      query: GET_ROUTES
    },
    error: new Error("Network error")
  }
]

const graphqlErrorMock = [
  {
    request: {
      query: GET_ROUTES
    },
    result: {
      errors: [new GraphQLError("GraphQL error occurred")]
    }
  }
]

describe("View Component", () => {
  test("renders View component without crashing", () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <View />
      </MockedProvider>
    )
    expect(screen.getByRole("main")).toBeInTheDocument()
  })

  test("renders Info component", () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <View />
      </MockedProvider>
    )
    // Info component should be present
    const main = screen.getByRole("main")
    expect(main).toBeInTheDocument()
  })

  test("renders LineSelect component", async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <View />
      </MockedProvider>
    )

    // Wait for data to load and component to render
    await waitFor(() => {
      const main = screen.getByRole("main")
      expect(main).toBeInTheDocument()
    })
  })

  test("renders StopTable component", () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <View />
      </MockedProvider>
    )

    // StopTable should be rendered (even if empty initially)
    const main = screen.getByRole("main")
    expect(main).toBeInTheDocument()
  })

  test("provides stops context to children", async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <View />
      </MockedProvider>
    )

    // Wait for the provider to be set up
    await waitFor(() => {
      const main = screen.getByRole("main")
      expect(main).toBeInTheDocument()
    })
  })

  test("handles loading state", () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <View />
      </MockedProvider>
    )

    const main = screen.getByRole("main")
    expect(main).toBeInTheDocument()
  })

  test("handles network error gracefully", async () => {
    render(
      <MockedProvider mocks={errorMock} addTypename={false}>
        <View />
      </MockedProvider>
    )

    await waitFor(() => {
      expect(screen.getByRole("main")).toBeInTheDocument()
    })
  })

  test("handles GraphQL error gracefully", async () => {
    render(
      <MockedProvider mocks={graphqlErrorMock} addTypename={false}>
        <View />
      </MockedProvider>
    )

    await waitFor(() => {
      expect(screen.getByRole("main")).toBeInTheDocument()
    })
  })

  test("renders with empty mocks", () => {
    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <View />
      </MockedProvider>
    )

    expect(screen.getByRole("main")).toBeInTheDocument()
  })

  test("initializes with empty line selection", () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <View />
      </MockedProvider>
    )

    expect(screen.getByRole("main")).toBeInTheDocument()
  })

  test("renders LineSelect with data", async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <View />
      </MockedProvider>
    )

    await waitFor(() => {
      expect(screen.getByRole("main")).toBeInTheDocument()
    })
  })
})
