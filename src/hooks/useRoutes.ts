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
 * @param lineId - Optional line ID to filter patterns (e.g., "3")
 * @returns RouteData with loading/error states
 */
export function useRoutes(lineId?: string): UseRoutesResult {
  const [data, setData] = useState<RouteData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    let isMounted = true

    async function fetchData() {
      try {
        setLoading(true)
        setError(null)

        const patterns = await fetchJourneyPatterns(lineId)
        const routes = transformJourneyPatternsToRoutes(patterns)

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
  }, [lineId])

  return { data, loading, error }
}
