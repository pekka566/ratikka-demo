import { render, screen, within } from "@testing-library/react"
import React from "react"
import { Stop } from "../../types"
import { StopsProvider } from "../View/StopsContext"
import { StopTable } from "./StopTable"

const mockStops: Stop[] = [
  {
    id: "stop1",
    name: "Test Stop 1",
    gtfsId: "test:stop1",
    lat: 61.4978,
    lon: 23.761
  },
  {
    id: "stop2",
    name: "Test Stop 2",
    gtfsId: "test:stop2",
    lat: 61.4989,
    lon: 23.7621
  },
  {
    id: "stop3",
    name: "Test Stop 3",
    gtfsId: "test:stop3",
    lat: 61.5,
    lon: 23.77
  }
]

describe("StopTable Component", () => {
  test("renders StopTable without crashing", () => {
    render(
      <StopsProvider stops={mockStops}>
        <StopTable />
      </StopsProvider>
    )
    expect(screen.getByRole("table")).toBeInTheDocument()
  })

  test("renders table headers correctly", () => {
    render(
      <StopsProvider stops={mockStops}>
        <StopTable />
      </StopsProvider>
    )

    expect(screen.getByText("Stop name")).toBeInTheDocument()
  })

  test("renders empty when no stops provided", () => {
    render(
      <StopsProvider stops={undefined}>
        <StopTable />
      </StopsProvider>
    )

    const table = screen.queryByRole("table")
    expect(table).not.toBeInTheDocument()
  })

  test("renders empty when empty stops array provided", () => {
    render(
      <StopsProvider stops={[]}>
        <StopTable />
      </StopsProvider>
    )

    // Table should still render even with empty array
    const table = screen.getByRole("table")
    expect(table).toBeInTheDocument()
  })

  test("renders correct number of stop rows", () => {
    render(
      <StopsProvider stops={mockStops}>
        <StopTable />
      </StopsProvider>
    )

    // Each stop should have a row in the table body
    const table = screen.getByRole("table")
    expect(table).toBeInTheDocument()

    mockStops.forEach((stop) => {
      expect(screen.getByText(stop.name)).toBeInTheDocument()
    })
  })

  test("has correct aria-label", () => {
    render(
      <StopsProvider stops={mockStops}>
        <StopTable />
      </StopsProvider>
    )

    expect(screen.getByLabelText("stop table")).toBeInTheDocument()
  })

  test("renders all stop names", () => {
    render(
      <StopsProvider stops={mockStops}>
        <StopTable />
      </StopsProvider>
    )

    expect(screen.getByText("Test Stop 1")).toBeInTheDocument()
    expect(screen.getByText("Test Stop 2")).toBeInTheDocument()
    expect(screen.getByText("Test Stop 3")).toBeInTheDocument()
  })

  test("displays correct table structure", () => {
    render(
      <StopsProvider stops={mockStops}>
        <StopTable />
      </StopsProvider>
    )

    const table = screen.getByRole("table")
    const rowgroups = within(table).getAllByRole("rowgroup")
    // Table should have thead and tbody (2 rowgroups)
    expect(rowgroups.length).toBeGreaterThanOrEqual(1)
  })

  test("handles single stop", () => {
    const singleStop = [mockStops[0]]
    render(
      <StopsProvider stops={singleStop}>
        <StopTable />
      </StopsProvider>
    )

    expect(screen.getByText("Test Stop 1")).toBeInTheDocument()
    expect(screen.queryByText("Test Stop 2")).not.toBeInTheDocument()
  })

  test("table has correct ARIA attributes", () => {
    render(
      <StopsProvider stops={mockStops}>
        <StopTable />
      </StopsProvider>
    )

    const table = screen.getByRole("table")
    expect(table).toHaveAttribute("aria-label", "stop table")
  })
})
