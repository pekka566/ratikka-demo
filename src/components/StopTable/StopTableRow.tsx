import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp"
import Collapse from "@mui/material/Collapse"
import IconButton from "@mui/material/IconButton"
import TableCell from "@mui/material/TableCell"
import TableRow from "@mui/material/TableRow"
import { ReactElement, useContext, useState } from "react"
import stopMockData from "../../testdata/stopMockData"
import { Times } from "../../types"
import { TimeTable } from "../TimeTable/TimeTable"
import { StopsContext } from "../View/StopsContext"
import { convertStopData, getStop } from "./helpers"

// Stoptimes for trams are not returned yet from  https://api.digitransit.fi/routing/v1/routers/waltti/index/graphql
// Using static stop id to get results
// const TEST_STOP_ID = "tampere:5021"
// const currentDate = new Date().toISOString().slice(0, 10).replace(/-/g, "")

type Props = {
  stopId: string
}

const tableCellStyle = (open: boolean) => ({
  paddingBottom: "0.5em",
  paddingTop: "0.5em",
  borderBottom: open ? "unset" : undefined
})

const StopTableRow = ({ stopId }: Props): ReactElement => {
  const [open, setOpen] = useState(false)
  const [stopTimes, setStopTimes] = useState<Times | undefined>(undefined)
  const openStop = (_gtfsId: string) => {
    const times = convertStopData(stopMockData)
    setStopTimes(times)
    setOpen(!open)
  }

  const stops = useContext(StopsContext)
  const stop = getStop(stopId, stops)
  const tableRow = stop ? (
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
              <TimeTable stopTimes={stopTimes} stop={stop} />
            </Collapse>
          </TableCell>
        </TableRow>
      )}
    </>
  ) : (
    <></>
  )
  return <>{tableRow}</>
}

export { StopTableRow }
