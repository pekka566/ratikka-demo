import { ChangeEvent, ReactElement, useMemo, useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography
} from "@material-ui/core"
import { useQuery } from "@apollo/client"
import map from "lodash/map"
import head from "lodash/head"
import { GET_DATA } from "../../queries/getData"

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(3),
    minWidth: 200
  },
  mainText: {
    marginTop: theme.spacing(5)
  }
}))

// TODO: move to types file
type Data = {
  routes?: Array<Route>
}

type Route = {
  id: string
  shortName: string
  longName: string
  patterns?: Array<Pattern>
  __typename: string
}

type Pattern = IdNamePair & {
  code: string
  directionId: number
  headsign: string
  stops?: Array<Stop>
}

type Stop = IdNamePair & {
  __typename: string
}

type IdNamePair = {
  id: string
  name: string
}

const View = (): ReactElement => {
  const { formControl, mainText } = useStyles()
  const [line, setLine] = useState("")

  // Since MUI Select in not a real select element you will need to cast e.target.value using as Type and type the handler as React.ChangeEvent<{ value: unknown }>
  const handleChange = (event: ChangeEvent<{ value: unknown }>) => {
    setLine(event.target.value as string)
  }

  const { loading, error, data } = useQuery(GET_DATA)

  // console.log("data...", data)
  // console.log("getLineNamesAndIds", getLineNamesAndIds(data))

  const getLineNamesAndIds = (data: Data): Array<IdNamePair> => {
    console.log("getLineNames...")
    // data contains only one route
    const route = head(data?.routes)
    // each pattern has a name. Removes (tampere:xxxx) part of the name.
    return map(route?.patterns, (pattern) => ({
      id: pattern.id,
      name: pattern.name?.replace(/\s*\(.*?\)\s*/g, " ").trim()
    }))
  }

  const lineNames = useMemo(() => getLineNamesAndIds(data), [data])

  return (
    <main>
      <div className={mainText}>
        <Typography variant="h5" align="center" paragraph>
          Some text...
        </Typography>
      </div>
      <FormControl className={formControl}>
        <InputLabel id="line-select-label">Line</InputLabel>
        <Select
          labelId="line-select-label"
          id="line-select"
          value={line}
          onChange={(event) => handleChange(event)}
        >
          {lineNames.map((lineName) => (
            <MenuItem key={lineName.id} value={lineName.id}>
              {lineName.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </main>
  )
}

export { View }
