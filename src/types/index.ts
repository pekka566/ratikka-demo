type RouteData = {
  routes?: Array<Route>
}

type Route = {
  id: string
  shortName: string
  longName: string
  patterns?: Array<Pattern>
}

type Pattern = IdNamePair & {
  code: string
  directionId: number
  headsign: string
  stops?: Array<Stop>
}

type Stop = IdNamePair & {
  gtfsId: string
  shortName?: string
  stopTimes?: Times
  lat?: number
  lon?: number
}

type IdNamePair = {
  id: string
  name: string
}

type Times = {
  departureTimes?: Array<Date>
}

type VehicleLocation = {
  vehicleRef: string
  lineRef: string
  latitude: number
  longitude: number
  bearing: number
  delay: string
  nextStop?: string
  timestamp: Date
}

export type {
  RouteData,
  Route,
  Pattern,
  Stop,
  IdNamePair,
  Times,
  VehicleLocation
}
