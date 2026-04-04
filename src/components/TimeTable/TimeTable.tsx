import Grid from "@mui/material/Grid"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableRow from "@mui/material/TableRow"
import Typography from "@mui/material/Typography"
import { ReactElement } from "react"
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

const displayDate = (date: Date): string => dateFormat.format(date)

const TimeTable = ({ stopTimes, stop }: Props): ReactElement => {
  const coordinatesMissing = !stop?.lat || !stop?.lon
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
                  <TableRow
                    key={departureTime.getTime()}
                    sx={{
                      "&:last-child th, &:last-child td": {
                        borderBottom: 0
                      }
                    }}
                  >
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
