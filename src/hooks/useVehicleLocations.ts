import { useEffect, useState } from "react"
import { transformVehicleActivityToLocations } from "../services/dataTransformers"
import { fetchVehicleActivity } from "../services/itsfactoryApi"
import { VehicleLocation } from "../types"

interface UseVehicleLocationsResult {
  vehicles: VehicleLocation[]
  loading: boolean
  error: Error | null
}

/**
 * Custom hook to fetch real-time vehicle locations for tram lines 1 and 3
 * Auto-refreshes every 10 seconds to show live positions
 *
 * @returns Array of vehicle locations with loading/error states
 */
export function useVehicleLocations(): UseVehicleLocationsResult {
  const [vehicles, setVehicles] = useState<VehicleLocation[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    let isMounted = true

    async function fetchVehicles() {
      try {
        setLoading(true)
        setError(null)

        // Fetch vehicle activity for both lines in parallel
        const [line1Vehicles, line3Vehicles] = await Promise.all([
          fetchVehicleActivity("1"),
          fetchVehicleActivity("3")
        ])

        // Combine and transform results
        const allVehicles = [...line1Vehicles, ...line3Vehicles]
        const locations = transformVehicleActivityToLocations(allVehicles)

        if (isMounted) {
          setVehicles(locations)
          setLoading(false)
        }
      } catch (err) {
        if (isMounted) {
          setError(
            err instanceof Error
              ? err
              : new Error("Failed to fetch vehicle locations")
          )
          setLoading(false)
        }
      }
    }

    fetchVehicles()

    // Get refresh interval from environment or default to 10 seconds
    const refreshInterval =
      parseInt(import.meta.env.VITE_VEHICLE_REFRESH_INTERVAL) || 10000

    // Refresh vehicle locations every 10 seconds
    const interval = setInterval(fetchVehicles, refreshInterval)

    return () => {
      isMounted = false
      clearInterval(interval)
    }
  }, [])

  return { vehicles, loading, error }
}
