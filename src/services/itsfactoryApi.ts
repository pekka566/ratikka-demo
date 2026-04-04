import {
  ItsFactoryApiResponse,
  ItsFactoryJourneyPattern,
  ItsFactoryLine,
  ItsFactoryStopPoint,
  VehicleActivity
} from "../types/itsfactory"

const BASE_URL = "http://data.itsfactory.fi/journeys/api/1"

class ApiError extends Error {
  constructor(
    message: string,
    public status?: number
  ) {
    super(message)
    this.name = "ApiError"
  }
}

async function fetchFromApi<T>(endpoint: string): Promise<T> {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`)

    if (!response.ok) {
      throw new ApiError(
        `API request failed: ${response.statusText}`,
        response.status
      )
    }

    const data: ItsFactoryApiResponse<T> = await response.json()

    if (data.status !== "success") {
      throw new ApiError("API returned non-success status")
    }

    return data.body
  } catch (error) {
    if (error instanceof ApiError) {
      throw error
    }
    throw new ApiError(
      `Network error: ${error instanceof Error ? error.message : "Unknown error"}`
    )
  }
}

export async function fetchLines(): Promise<ItsFactoryLine[]> {
  return fetchFromApi<ItsFactoryLine[]>("/lines")
}

export async function fetchJourneyPatterns(
  lineId?: string
): Promise<ItsFactoryJourneyPattern[]> {
  const endpoint = lineId
    ? `/journey-patterns?lineId=${lineId}`
    : "/journey-patterns"
  return fetchFromApi<ItsFactoryJourneyPattern[]>(endpoint)
}

export async function fetchStopPoints(): Promise<ItsFactoryStopPoint[]> {
  return fetchFromApi<ItsFactoryStopPoint[]>("/stop-points")
}

export async function fetchVehicleActivity(
  lineRef?: string
): Promise<VehicleActivity[]> {
  const endpoint = lineRef
    ? `/vehicle-activity?lineRef=${lineRef}`
    : "/vehicle-activity"
  return fetchFromApi<VehicleActivity[]>(endpoint)
}
