type Data = {
  routes?: Array<Route>
}

type Route = {
  id: string
  shortName: string
  longName: string
  patterns?: Array<Pattern>
}

type Pattern = IdNamePair & {
  code: string
  directionId: number
  headsign: string
  stops?: Array<Stop>
}

type Stop = IdNamePair

type IdNamePair = {
  id: string
  name: string
}

export type { Data, Route, Pattern, Stop, IdNamePair }
