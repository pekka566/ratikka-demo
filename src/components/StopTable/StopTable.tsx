import React, { ReactElement } from "react"
import { makeStyles } from "@material-ui/core"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import { Stop } from "../../types"
import { StopTableRow } from "./StopTableRow"

type Props = {
  stops?: Array<Stop>
}

const useStyles = makeStyles(() => ({
  tableHead: {
    fontSize: "1.25rem"
  }
}))

const StopTable = ({ stops }: Props): ReactElement => {
  if (!stops) return <></>
  const { tableHead } = useStyles()
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
          <StopTableRow stop={stop} key={stop.id} />
        ))}
      </TableBody>
    </Table>
  )
}

export { StopTable }
