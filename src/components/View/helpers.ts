import map from "lodash/map"
import head from "lodash/head"

import { RouteData, IdNamePair, Route, Stop } from "../../types"

const getRoute = (data: RouteData): Route | undefined => {
  // data contains only one route
  return head(data?.routes)
}

const getLineNamesAndIds = (data: RouteData): Array<IdNamePair> => {
  const route = getRoute(data)
  // each pattern has a name. Remove (tampere:xxxx) part of the name.
  return map(route?.patterns, (pattern) => ({
    id: pattern.id,
    name: pattern.name?.replace(/\s*\(.*?\)\s*/g, " ").trim()
  }))
}

const getStops = (lineId: string, data: RouteData): Array<Stop> | undefined => {
  if (!lineId) return undefined
  const route = getRoute(data)
  const pattern = route?.patterns?.find((x) => x.id === lineId)
  return pattern?.stops
}

export { getLineNamesAndIds, getStops }
