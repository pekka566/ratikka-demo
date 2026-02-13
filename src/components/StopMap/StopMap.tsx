import { divIcon, DivIcon, LatLngExpression } from "leaflet"
import { ReactElement, useContext } from "react"
import "leaflet/dist/leaflet.css"
import { MapContainer, Marker, TileLayer, Popup } from "react-leaflet"
import "./StopMap.css"
import { useVehicleLocations } from "../../hooks/useVehicleLocations"
import { Stop, VehicleLocation } from "../../types"
import { StopsContext } from "../View/StopsContext"

type Props = {
  stop?: Stop
}

const getIcon = (other: boolean): DivIcon => {
  return divIcon({
    className: other ? "stop-icon-other" : "stop-icon",
    iconSize: [30, 30],
    iconAnchor: [0, 0],
    popupAnchor: [15, 0]
  })
}

const getVehicleIcon = (lineRef: string, bearing: number): DivIcon => {
  const className = `vehicle-icon vehicle-icon-line-${lineRef}`
  return divIcon({
    className,
    iconSize: [40, 40],
    iconAnchor: [20, 20],
    popupAnchor: [0, -20],
    html: `<div style="transform: rotate(${bearing}deg); width: 100%; height: 100%; display: flex; align-items: center; justify-content: center;">🚊</div>`
  })
}

const getPosition = (stop: Stop | undefined): LatLngExpression => {
  const lat = stop?.lat ?? 0
  const lon = stop?.lon ?? 0
  const position: LatLngExpression = [lat, lon]
  return position
}

const StopMap = ({ stop }: Props): ReactElement => {
  const name = stop?.name
  const id = stop?.id
  const zoom = 15
  const { stops } = useContext(StopsContext)
  const { vehicles, loading: vehiclesLoading } = useVehicleLocations()

  return (
    <MapContainer
      center={getPosition(stop)}
      zoom={zoom}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution="&copy; <a href='http://osm.org/copyright'>OpenStreetMap</a> contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {stops?.map((x: Stop) => {
        const other = x.id != id

        return (
          <Marker
            icon={getIcon(other)}
            position={getPosition(x)}
            title={name}
            key={x.id}
          >
            <Popup>{name}</Popup>
          </Marker>
        )
      })}
      {!vehiclesLoading &&
        vehicles.map((vehicle: VehicleLocation) => {
          const position: LatLngExpression = [
            vehicle.latitude,
            vehicle.longitude
          ]
          return (
            <Marker
              icon={getVehicleIcon(vehicle.lineRef, vehicle.bearing)}
              position={position}
              key={vehicle.vehicleRef}
            >
              <Popup>
                <div>
                  <strong>Line {vehicle.lineRef}</strong>
                  <br />
                  Vehicle: {vehicle.vehicleRef}
                  <br />
                  Delay: {vehicle.delay}
                  <br />
                  {vehicle.nextStop && <>Next stop: {vehicle.nextStop}</>}
                </div>
              </Popup>
            </Marker>
          )
        })}
    </MapContainer>
  )
}

export { StopMap }
