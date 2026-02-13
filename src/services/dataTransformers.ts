import { Pattern, Route, Stop } from "../types"
import {
  ItsFactoryJourneyPattern,
  ItsFactoryStopPoint,
  VehicleActivity
} from "../types/itsfactory"

/**
 * Parse location string "61.49848,23.7707" into lat/lon numbers
 */
function parseLocation(location: string): { lat: number; lon: number } {
  const [latStr, lonStr] = location.split(",")
  return {
    lat: parseFloat(latStr),
    lon: parseFloat(lonStr)
  }
}

/**
 * Transform ItsFactory stop point to app Stop type
 */
export function transformStopPoint(stopPoint: ItsFactoryStopPoint): Stop {
  const { lat, lon } = parseLocation(stopPoint.location)

  return {
    id: stopPoint.shortName,
    name: stopPoint.name,
    gtfsId: stopPoint.shortName,
    shortName: stopPoint.shortName,
    lat,
    lon
  }
}

/**
 * Transform ItsFactory journey pattern to app Pattern type
 */
export function transformJourneyPattern(
  pattern: ItsFactoryJourneyPattern
): Pattern {
  // Extract ID from URL (e.g., "http://...pattern/123" -> "123")
  const urlParts = pattern.url.split("/")
  const id = urlParts[urlParts.length - 1]

  return {
    id,
    name: pattern.name,
    code: id,
    directionId: parseInt(pattern.directionId, 10) || 0,
    headsign: pattern.name,
    stops: pattern.stopPoints.map(transformStopPoint)
  }
}

/**
 * Transform ItsFactory journey patterns to app Route format
 */
export function transformJourneyPatternsToRoutes(
  patterns: ItsFactoryJourneyPattern[]
): Route[] {
  // Group patterns by line
  const patternsByLine = patterns.reduce(
    (acc, pattern) => {
      const lineUrl = pattern.lineUrl
      if (!acc[lineUrl]) {
        acc[lineUrl] = []
      }
      acc[lineUrl].push(pattern)
      return acc
    },
    {} as Record<string, ItsFactoryJourneyPattern[]>
  )

  // Create Route for each line
  return Object.entries(patternsByLine).map(([lineUrl, linePatterns]) => {
    const urlParts = lineUrl.split("/")
    const lineId = urlParts[urlParts.length - 1]

    // Use first pattern to get line info
    const firstPattern = linePatterns[0]

    return {
      id: lineId,
      shortName: lineId,
      longName: firstPattern.name,
      patterns: linePatterns.map(transformJourneyPattern)
    }
  })
}

/**
 * Extract departure times for a specific stop from vehicle activity data
 */
export function extractDepartureTimes(
  vehicles: VehicleActivity[],
  stopShortName: string
): Date[] {
  const departures: Date[] = []

  for (const vehicle of vehicles) {
    const onwardCalls = vehicle.monitoredVehicleJourney.onwardCalls || []

    for (const call of onwardCalls) {
      if (call.stopPointRef === stopShortName) {
        departures.push(new Date(call.expectedDepartureTime))
      }
    }
  }

  // Sort by time ascending
  return departures.sort((a, b) => a.getTime() - b.getTime())
}
