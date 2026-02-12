import { render, screen } from "@testing-library/react"
import React from "react"
import { vi } from "vitest"
import { Stop, Times } from "../../types"
import { StopsProvider } from "../View/StopsContext"
import { TimeTable } from "./TimeTable"

// Mock StopMap component
vi.mock("../StopMap", () => ({
  StopMap: () => <div data-testid="stop-map">Mocked Map</div>
}))

describe("TimeTable Component", () => {
  const mockStop: Stop = {
    id: "stop1",
    name: "Test Stop",
    gtfsId: "test:stop1",
    lat: 61.4978,
    lon: 23.761
  }

  const mockStopTimes: Times = {
    departureTimes: [
      new Date("2026-02-12T10:00:00"),
      new Date("2026-02-12T10:15:00"),
      new Date("2026-02-12T10:30:00")
    ]
  }

  test("renders TimeTable with stop and times", () => {
    render(
      <StopsProvider stops={[mockStop]}>
        <TimeTable stopTimes={mockStopTimes} stop={mockStop} />
      </StopsProvider>
    )

    expect(screen.getByText(/next departures/i)).toBeInTheDocument()
  })

  test("displays departure times", () => {
    render(
      <StopsProvider stops={[mockStop]}>
        <TimeTable stopTimes={mockStopTimes} stop={mockStop} />
      </StopsProvider>
    )

    // Check that times are displayed (format: HH.MM in Finnish locale)
    expect(screen.getByText(/10.00/)).toBeInTheDocument()
    expect(screen.getByText(/10.15/)).toBeInTheDocument()
    expect(screen.getByText(/10.30/)).toBeInTheDocument()
  })

  test("renders StopMap when coordinates are available", () => {
    render(
      <StopsProvider stops={[mockStop]}>
        <TimeTable stopTimes={mockStopTimes} stop={mockStop} />
      </StopsProvider>
    )

    expect(screen.getByTestId("stop-map")).toBeInTheDocument()
  })

  test("does not render StopMap when coordinates are missing", () => {
    const stopWithoutCoords: Stop = {
      id: "stop2",
      name: "Stop Without Coords",
      gtfsId: "test:stop2",
      lat: undefined,
      lon: undefined
    }

    render(
      <StopsProvider stops={[stopWithoutCoords]}>
        <TimeTable stopTimes={mockStopTimes} stop={stopWithoutCoords} />
      </StopsProvider>
    )

    expect(screen.queryByTestId("stop-map")).not.toBeInTheDocument()
  })

  test("renders nothing when stop is undefined", () => {
    const { container } = render(
      <StopsProvider stops={[]}>
        <TimeTable stopTimes={mockStopTimes} stop={undefined} />
      </StopsProvider>
    )

    expect(container.querySelector("table")).not.toBeInTheDocument()
  })

  test("renders with empty departure times", () => {
    const emptyTimes: Times = {
      departureTimes: []
    }

    render(
      <StopsProvider stops={[mockStop]}>
        <TimeTable stopTimes={emptyTimes} stop={mockStop} />
      </StopsProvider>
    )

    expect(screen.getByText(/next departures/i)).toBeInTheDocument()
    const table = screen.getByRole("table")
    expect(table).toBeInTheDocument()
  })

  test("renders with undefined stopTimes", () => {
    render(
      <StopsProvider stops={[mockStop]}>
        <TimeTable stopTimes={undefined} stop={mockStop} />
      </StopsProvider>
    )

    expect(screen.getByText(/next departures/i)).toBeInTheDocument()
  })

  test("does not render map when lat is missing", () => {
    const stopWithoutLat: Stop = {
      id: "stop3",
      name: "Stop Without Lat",
      gtfsId: "test:stop3",
      lat: undefined,
      lon: 23.761
    }

    render(
      <StopsProvider stops={[stopWithoutLat]}>
        <TimeTable stopTimes={mockStopTimes} stop={stopWithoutLat} />
      </StopsProvider>
    )

    expect(screen.queryByTestId("stop-map")).not.toBeInTheDocument()
  })

  test("does not render map when lon is missing", () => {
    const stopWithoutLon: Stop = {
      id: "stop4",
      name: "Stop Without Lon",
      gtfsId: "test:stop4",
      lat: 61.4978,
      lon: undefined
    }

    render(
      <StopsProvider stops={[stopWithoutLon]}>
        <TimeTable stopTimes={mockStopTimes} stop={stopWithoutLon} />
      </StopsProvider>
    )

    expect(screen.queryByTestId("stop-map")).not.toBeInTheDocument()
  })
})
