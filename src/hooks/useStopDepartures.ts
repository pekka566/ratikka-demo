import { useEffect, useState } from "react"
import { extractDepartureTimes } from "../services/dataTransformers"
import { fetchVehicleActivity } from "../services/itsfactoryApi"

interface UseStopDeparturesResult {
  departures: Date[]
  loading: boolean
  error: Error | null
}

/**
 * Custom hook to fetch real-time departure times for a specific stop
 * Auto-refreshes every minute to keep data current
 *
 * @param stopShortName - Stop ID (e.g., "0950", "0839")
 * @param lineRef - Line reference to filter vehicles (e.g., "3")
 * @returns Array of departure times with loading/error states
 */
export function useStopDepartures(
  stopShortName: string,
  lineRef: string
): UseStopDeparturesResult {
  const [departures, setDepartures] = useState<Date[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    let isMounted = true

    async function fetchDepartures() {
      try {
        setLoading(true)
        setError(null)

        const vehicles = await fetchVehicleActivity(lineRef)
        const times = extractDepartureTimes(vehicles, stopShortName)

        if (isMounted) {
          setDepartures(times)
          setLoading(false)
        }
      } catch (err) {
        if (isMounted) {
          setError(
            err instanceof Error
              ? err
              : new Error("Failed to fetch departure times")
          )
          setLoading(false)
        }
      }
    }

    fetchDepartures()

    // Refresh departure times every 60 seconds
    const interval = setInterval(fetchDepartures, 60000)

    return () => {
      isMounted = false
      clearInterval(interval)
    }
  }, [stopShortName, lineRef])

  return { departures, loading, error }
}
