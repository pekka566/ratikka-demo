import { ReactElement } from "react"
import Table from "@material-ui/core/Table"
import Typography from "@material-ui/core/Typography"
import TableBody from "@material-ui/core/TableBody"
import TableRow from "@material-ui/core/TableRow"
import TableCell from "@material-ui/core/TableCell"
import { makeStyles } from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"

import { Stop, Times } from "../../types"
import { StopMap } from "../StopMap"

type Props = {
  stopTimes?: Times
  stop?: Stop
}

const dateFormat = new Intl.DateTimeFormat("fi-FI", {
  hour: "numeric",
  minute: "numeric"
})

const useStyles = makeStyles(() => ({
  tableRow: {
    "&:last-child th, &:last-child td": {
      borderBottom: 0
    }
  }
}))

const displayDate = (date: Date): string => dateFormat.format(date)

const TimeTable = ({ stopTimes, stop }: Props): ReactElement => {
  const coordinatesMissing = !stop?.lat || !stop?.lon
  const { tableRow } = useStyles()
  return (
    <>
      {stop && (
        <Grid container spacing={2}>
          <Grid item xs={12} sm={3}>
            <Typography gutterBottom variant="subtitle1" component="h2">
              Next departures
            </Typography>
            <Table size="small" aria-label="purchases">
              <TableBody>
                {stopTimes?.departureTimes?.map((departureTime) => (
                  <TableRow key={departureTime.getTime()} className={tableRow}>
                    <TableCell>{displayDate(departureTime)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Grid>
          <Grid item xs={12} sm={9}>
            {!coordinatesMissing && <StopMap stop={stop} />}
          </Grid>
        </Grid>
      )}
    </>
  )
}

export { TimeTable }
