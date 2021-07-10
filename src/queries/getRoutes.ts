import { gql } from "@apollo/client"

const GET_ROUTES = gql`
  query {
    routes(name: "3", transportModes: TRAM) {
      id
      shortName
      longName
      patterns {
        id
        code
        directionId
        headsign
        name
        stops {
          id
          name
          gtfsId
        }
      }
    }
  }
`

export { GET_ROUTES }
