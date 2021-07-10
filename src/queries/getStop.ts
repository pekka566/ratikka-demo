import { gql } from "@apollo/client"

const GET_STOP = gql`
  query GetStop($gtfsId: String!) {
    stop(id: $gtfsId) {
      gtfsId
      name
      lat
      lon
      stoptimesForServiceDate(date: "20210710") {
        stoptimes {
          realtimeArrival
          realtimeDeparture
        }
      }
    }
  }
`

export { GET_STOP }
