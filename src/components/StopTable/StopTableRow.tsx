import { ReactElement, useState } from "react"
import Collapse from "@material-ui/core/Collapse"
import TableCell from "@material-ui/core/TableCell"
import TableRow from "@material-ui/core/TableRow"
import IconButton from "@material-ui/core/IconButton"
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown"
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp"
import { useLazyQuery } from "@apollo/client"

import { GET_STOP } from "../../queries/getStop"
import { Stop } from "../../types"
import stopMockData from "../../testdata/stopMockData"
import { convertStopData } from "./helpers"
import { TimeTable } from "../TimeTable/TimeTable"

// Stoptimes for trams are not returned yet from  https://api.digitransit.fi/routing/v1/routers/waltti/index/graphql
// Using static stop id to get results
// const TEST_STOP_ID = "tampere:5021"
// const currentDate = new Date().toISOString().slice(0, 10).replace(/-/g, "")

type Props = {
  stop: Stop
}

const tableCellStyle = (open: boolean) => ({
  paddingBottom: "0.5em",
  paddingTop: "0.5em",
  borderBottom: open ? "unset" : undefined
})

const StopTableRow = ({ stop }: Props): ReactElement => {
  const [open, setOpen] = useState(false)
  const [stopData, setStopData] = useState<Stop | undefined>(undefined)
  const [getStop, result] = useLazyQuery(GET_STOP, {
    fetchPolicy: "network-only"
  })

  const openStop = (gtfsId: string) => {
    // load stop timetables
    // getStop({ variables: { gtfsId: TEST_STOP_ID } })
    // TODO: find out why GraphQL call doesn't work
    // Using mock-data

    console.log("result...", result)

    const data = convertStopData(stopMockData)
    setStopData(data)
    setOpen(!open)
  }

  return (
    <>
      <TableRow key={stop.id} onClick={() => openStop(stop.gtfsId)}>
        <TableCell style={tableCellStyle(open)}>
          <IconButton
            size="small"
            aria-label="expand row"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row" style={tableCellStyle(open)}>
          {stop.name}
        </TableCell>
        <TableCell align="right" style={tableCellStyle(open)}></TableCell>
      </TableRow>
      {open && (
        <TableRow>
          <TableCell colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <TimeTable stop={stopData} />
            </Collapse>
          </TableCell>
        </TableRow>
      )}
    </>
  )
}

export { StopTableRow }
