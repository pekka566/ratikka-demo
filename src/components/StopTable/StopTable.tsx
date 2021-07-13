import { ReactElement, useContext } from "react"
import { makeStyles } from "@material-ui/core"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import { StopTableRow } from "./StopTableRow"
import { StopsContext } from "../View/StopsContext"

const useStyles = makeStyles(() => ({
  tableHead: {
    fontSize: "1.25rem"
  }
}))

const StopTable = (): ReactElement => {
  const { tableHead } = useStyles()
  const stops = useContext(StopsContext)
  if (!stops) return <></>
  return (
    <Table aria-label="stop table">
      <TableHead>
        <TableRow>
          <TableCell></TableCell>
          <TableCell className={tableHead}>Stop name</TableCell>
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
