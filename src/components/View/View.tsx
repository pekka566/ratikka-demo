import { ChangeEvent, ReactElement, useMemo, useState } from "react"
import { useQuery } from "@apollo/client"
import { GET_ROUTES } from "../../queries/getRoutes"
import { getLineNamesAndIds, getStops } from "./helpers"
import { Info } from "../Info"
import { LineSelect } from "../LineSelect"
import { StopTable } from "../StopTable"

const View = (): ReactElement => {
  const [line, setLine] = useState("")

  // Since MUI Select in not a real select element you will need to cast e.target.value using as Type and type the handler as React.ChangeEvent<{ value: unknown }>
  const handleChange = (event: ChangeEvent<{ value: unknown }>) => {
    setLine(event.target.value as string)
  }

  const { loading, error, data } = useQuery(GET_ROUTES)
  const lineNames = useMemo(() => getLineNamesAndIds(data), [data])

  const stops = getStops(line, data)

  return (
    <main>
      <Info />
      <LineSelect
        lineNames={lineNames}
        handleChange={handleChange}
        selectedLine={line}
      />
      <StopTable stops={stops} />
    </main>
  )
}

export { View }
