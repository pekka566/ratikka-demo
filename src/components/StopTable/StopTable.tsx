import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import { ReactElement, useContext } from "react"
import { StopsContext } from "../View/StopsContext"
import { StopTableRow } from "./StopTableRow"

const StopTable = (): ReactElement => {
  const { stops } = useContext(StopsContext)
  if (!stops) return <></>
  return (
    <Table aria-label="stop table">
      <TableHead>
        <TableRow>
          <TableCell></TableCell>
          <TableCell sx={{ fontSize: "1.25rem" }}>Stop name</TableCell>
          <TableCell></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {stops.map((stop) => (
          <StopTableRow stopId={stop.id} key={stop.id} />
        ))}
      </TableBody>
    </Table>
  )
}

export { StopTable }
