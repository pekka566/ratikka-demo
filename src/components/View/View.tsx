import { SelectChangeEvent, CircularProgress, Alert, Box } from "@mui/material"
import { ReactElement, useMemo, useState } from "react"
import { useRoutes } from "../../hooks/useRoutes"
import { Info } from "../Info"
import { LineSelect } from "../LineSelect"
import { StopTable } from "../StopTable"
import { getLineNamesAndIds, getStops } from "./helpers"
import { StopsProvider } from "./StopsContext"

const View = (): ReactElement => {
  const [line, setLine] = useState("")

  const handleChange = (event: SelectChangeEvent<string>) => {
    setLine(event.target.value)
  }

  const { loading, error, data } = useRoutes("3")
  const lineNames = useMemo(() => getLineNamesAndIds(data), [data])
  const stops = getStops(line, data)

  if (loading) {
    return (
      <main>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="50vh"
        >
          <CircularProgress />
        </Box>
      </main>
    )
  }

  if (error) {
    return (
      <main>
        <Box p={3}>
          <Alert severity="error">Error loading routes: {error.message}</Alert>
        </Box>
      </main>
    )
  }

  return (
    <main>
      <StopsProvider stops={stops}>
        <Info />
        <LineSelect
          lineNames={lineNames}
          handleChange={handleChange}
          selectedLine={line}
        />
        <StopTable />
      </StopsProvider>
    </main>
  )
}

export { View }
