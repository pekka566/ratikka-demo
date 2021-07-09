import { ReactElement, useState } from "react"
import Collapse from "@material-ui/core/Collapse"
import TableCell from "@material-ui/core/TableCell"
import TableRow from "@material-ui/core/TableRow"
import Box from "@material-ui/core/Box"
import Typography from "@material-ui/core/Typography"
import IconButton from "@material-ui/core/IconButton"
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown"
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp"

import { Stop } from "../../types"

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
  const openStop = (id: string) => {
    console.log(id)
    setOpen(!open)
  }

  return (
    <>
      <TableRow key={stop.id} onClick={() => openStop(stop.id)}>
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
        <TableCell align="right" style={tableCellStyle(open)}>
          Another
        </TableCell>
      </TableRow>
      {open && (
        <TableRow>
          <TableCell colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box margin={1}>
                <Typography variant="h6" gutterBottom component="div">
                  Something about something...
                </Typography>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      )}
    </>
  )
}

export { StopTableRow }
