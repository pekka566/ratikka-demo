import { ReactElement } from "react"
import L, { LatLngExpression } from "leaflet"
import "leaflet/dist/leaflet.css"
import { MapContainer, Marker, TileLayer, Popup, Circle } from "react-leaflet"
import "./StopMap.css"
import { Stop } from "../../types"

type Props = {
  stop: Stop
}

const icon: L.DivIcon = L.divIcon({
  className: "stop-icon",
  iconSize: [30, 30],
  iconAnchor: [0, 0],
  popupAnchor: [15, 0]
})

const StopMap = ({ stop }: Props): ReactElement => {
  const position: LatLngExpression = [stop.lat, stop.lon]
  const zoom = 15

  return (
    <MapContainer center={position} zoom={zoom} scrollWheelZoom={false}>
      <TileLayer
        attribution="&copy; <a href='http://osm.org/copyright'>OpenStreetMap</a> contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker icon={icon} position={position} title={stop.name}>
        <Popup>Some info about something.</Popup>
      </Marker>
      {/* <Circle center={position} radius={20} /> */}
    </MapContainer>
  )
}

export { StopMap }
