import { createContext, PropsWithChildren, ReactElement } from "react"
import { Stop } from "../../types"

type StopsContextValue = {
  stops?: Array<Stop>
  lineRef?: string
}

type Props = PropsWithChildren<StopsContextValue>

const StopsContext = createContext<StopsContextValue>({})

const StopsProvider = ({ stops, lineRef, children }: Props): ReactElement => (
  <StopsContext.Provider value={{ stops, lineRef }}>
    {children}
  </StopsContext.Provider>
)

export { StopsContext, StopsProvider }
