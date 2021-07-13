import { createContext, PropsWithChildren, ReactElement } from "react"

import { Stop } from "../../types"

type Props = PropsWithChildren<{ stops?: Array<Stop> }>

const StopsContext = createContext<Array<Stop> | undefined>(undefined)

const StopsProvider = ({ stops, children }: Props): ReactElement => (
  <StopsContext.Provider value={stops}>{children}</StopsContext.Provider>
)

export { StopsContext, StopsProvider }
