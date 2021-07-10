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
  departureTimes?: Array<Date>
  lat: number
  lon: number
}

type IdNamePair = {
  id: string
  name: string
}

//  Data model of the stop in Digitransit
type StopResultData = {
  data: StopInData
}

type StopInData = {
  stop: StopResult
}

type StopResult = IdNamePair & {
  gtfsId: string
  lat: number
  lon: number
  stoptimesForServiceDate?: Array<StoptimesForServiceDate>
}
type StoptimesForServiceDate = {
  stoptimes?: Array<Stoptimes>
}
type Stoptimes = {
  realtimeArrival: number
  realtimeDeparture: number
}

export type {
  RouteData,
  Route,
  Pattern,
  Stop,
  IdNamePair,
  StopResultData,
  StopResult,
  StopInData,
  StoptimesForServiceDate,
  Stoptimes
}
