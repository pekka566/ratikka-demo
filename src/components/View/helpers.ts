import head from "lodash/head"
import map from "lodash/map"
import { RouteData, IdNamePair, Route, Stop } from "../../types"

const getRoute = (data: RouteData | null): Route | undefined => {
  // data contains only one route
  return head(data?.routes)
}

const getLineNamesAndIds = (data: RouteData | null): Array<IdNamePair> => {
  const route = getRoute(data)
  // each pattern has a name (ItsFactory journey pattern name)
  return map(route?.patterns, (pattern) => ({
    id: pattern.id,
    name: pattern.name
  }))
}

const getStops = (
  lineId: string,
  data: RouteData | null
): Array<Stop> | undefined => {
  if (!lineId) return undefined
  const route = getRoute(data)
  const pattern = route?.patterns?.find((x) => x.id === lineId)
  return pattern?.stops
}

export { getLineNamesAndIds, getStops }
