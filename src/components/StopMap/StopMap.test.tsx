import { render } from "@testing-library/react"
import React from "react"
import { vi } from "vitest"
import { Stop } from "../../types"
import { StopsProvider } from "../View/StopsContext"
import { StopMap } from "./StopMap"

// Mock react-leaflet components
vi.mock("react-leaflet", () => ({
  MapContainer: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="map-container">{children}</div>
  ),
  TileLayer: () => <div data-testid="tile-layer" />,
  Marker: () => <div data-testid="marker" />,
  Popup: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="popup">{children}</div>
  )
}))

const mockStop: Stop = {
  id: "stop1",
  name: "Test Stop",
  gtfsId: "test:stop1",
  lat: 61.4978,
  lon: 23.761
}

const mockStops: Stop[] = [
  mockStop,
  {
    id: "stop2",
    name: "Test Stop 2",
    gtfsId: "test:stop2",
    lat: 61.4989,
    lon: 23.7621
  }
]

describe("StopMap Component", () => {
  test("renders StopMap without crashing", () => {
    const { container } = render(
      <StopsProvider stops={mockStops}>
        <StopMap stop={mockStop} />
      </StopsProvider>
    )

    expect(
      container.querySelector('[data-testid="map-container"]')
    ).toBeInTheDocument()
  })

  test("renders map container", () => {
    const { getByTestId } = render(
      <StopsProvider stops={mockStops}>
        <StopMap stop={mockStop} />
      </StopsProvider>
    )

    expect(getByTestId("map-container")).toBeInTheDocument()
  })

  test("renders TileLayer", () => {
    const { getByTestId } = render(
      <StopsProvider stops={mockStops}>
        <StopMap stop={mockStop} />
      </StopsProvider>
    )

    expect(getByTestId("tile-layer")).toBeInTheDocument()
  })

  test("renders with undefined stop", () => {
    const { container } = render(
      <StopsProvider stops={mockStops}>
        <StopMap stop={undefined} />
      </StopsProvider>
    )

    expect(
      container.querySelector('[data-testid="map-container"]')
    ).toBeInTheDocument()
  })

  test("renders with empty stops context", () => {
    const { container } = render(
      <StopsProvider stops={[]}>
        <StopMap stop={mockStop} />
      </StopsProvider>
    )

    expect(
      container.querySelector('[data-testid="map-container"]')
    ).toBeInTheDocument()
  })

  test("renders markers for all stops in context", () => {
    const { getAllByTestId } = render(
      <StopsProvider stops={mockStops}>
        <StopMap stop={mockStop} />
      </StopsProvider>
    )

    const markers = getAllByTestId("marker")
    expect(markers).toHaveLength(mockStops.length)
  })

  test("renders with null stops context", () => {
    const { container } = render(
      <StopsProvider stops={undefined}>
        <StopMap stop={mockStop} />
      </StopsProvider>
    )

    expect(
      container.querySelector('[data-testid="map-container"]')
    ).toBeInTheDocument()
  })
})
