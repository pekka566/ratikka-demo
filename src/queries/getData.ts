import { gql } from "@apollo/client"

const GET_DATA = gql`
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
        }
      }
    }
  }
`

export { GET_DATA }
