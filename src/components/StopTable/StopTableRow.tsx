import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp"
import Collapse from "@mui/material/Collapse"
import IconButton from "@mui/material/IconButton"
import TableCell from "@mui/material/TableCell"
import TableRow from "@mui/material/TableRow"
import { ReactElement, useContext, useState } from "react"
import { useStopDepartures } from "../../hooks/useStopDepartures"
import { TimeTable } from "../TimeTable/TimeTable"
import { StopsContext } from "../View/StopsContext"
import { getStop } from "./helpers"

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
  const stops = useContext(StopsContext)
  const stop = getStop(stopId, stops)

  // Get real-time departures for this stop
  const stopShortName = stop?.shortName || stop?.gtfsId || stopId
  const { departures } = useStopDepartures(stopShortName, "3")

  const openStop = () => {
    setOpen(!open)
  }

  const stopTimes = { departureTimes: departures }

  const tableRow = stop ? (
    <>
      <TableRow key={stop.id} onClick={openStop}>
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
