import { useEffect, useState } from "react"
import { transformJourneyPatternsToRoutes } from "../services/dataTransformers"
import { fetchJourneyPatterns } from "../services/itsfactoryApi"
import { RouteData } from "../types"

interface UseRoutesResult {
  data: RouteData | null
  loading: boolean
  error: Error | null
}

/**
 * Custom hook to fetch routes from ItsFactory API
 * Replaces Apollo Client's useQuery for GET_ROUTES
 *
 * @param lineId - Optional line ID(s) to filter patterns (e.g., "3" or ["1", "3"])
 * @returns RouteData with loading/error states
 */
export function useRoutes(lineId?: string | string[]): UseRoutesResult {
  const [data, setData] = useState<RouteData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  // Serialize lineId for stable dependency comparison
  const lineIdKey = Array.isArray(lineId) ? lineId.join(",") : lineId || ""

  useEffect(() => {
    let isMounted = true

    async function fetchData() {
      try {
        setLoading(true)
        setError(null)

        let allPatterns

        // Handle both single line ID and array of line IDs
        if (Array.isArray(lineId)) {
          // Fetch patterns for multiple lines in parallel
          const patternsArrays = await Promise.all(
            lineId.map((id) => fetchJourneyPatterns(id))
          )
          // Flatten the array of arrays
          allPatterns = patternsArrays.flat()
        } else {
          // Fetch patterns for single line or all lines
          allPatterns = await fetchJourneyPatterns(lineId)
        }

        const routes = transformJourneyPatternsToRoutes(allPatterns)

        if (isMounted) {
          setData({ routes })
          setLoading(false)
        }
      } catch (err) {
        if (isMounted) {
          setError(
            err instanceof Error ? err : new Error("Failed to fetch routes")
          )
          setLoading(false)
        }
      }
    }

    fetchData()

    return () => {
      isMounted = false
    }
  }, [lineIdKey])

  return { data, loading, error }
}
