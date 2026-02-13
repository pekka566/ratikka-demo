import { Stop } from "../../types"

const getStop = (id: string, stops?: Array<Stop>): Stop | undefined =>
  stops?.find((x) => x.id === id)

export { getStop }
