import { RouteData, IdNamePair, Stop } from "../../types"

const getLineNamesAndIds = (data: RouteData | null): Array<IdNamePair> => {
  // Collect all patterns from all routes
  const allPatterns =
    data?.routes?.flatMap((route) => route.patterns || []) || []

  // Return pattern names and IDs
  return allPatterns.map((pattern) => ({
    id: pattern.id,
    name: pattern.name
  }))
}

const getStops = (
  lineId: string,
  data: RouteData | null
): Array<Stop> | undefined => {
  if (!lineId) return undefined

  // Search for the pattern across all routes
  for (const route of data?.routes || []) {
    const pattern = route.patterns?.find((x) => x.id === lineId)
    if (pattern) {
      return pattern.stops
    }
  }

  return undefined
}

const getLineRefFromPatternId = (
  patternId: string,
  data: RouteData | null
): string | undefined => {
  // Find which route (line) this pattern belongs to
  for (const route of data?.routes || []) {
    const pattern = route.patterns?.find((x) => x.id === patternId)
    if (pattern) {
      return route.shortName
    }
  }
  return undefined
}

export { getLineNamesAndIds, getStops, getLineRefFromPatternId }
