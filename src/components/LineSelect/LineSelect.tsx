import { ChangeEvent, ReactElement } from "react"
import { makeStyles } from "@material-ui/core/styles"
import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core"
import { IdNamePair } from "../../types"

type Props = {
  lineNames: Array<IdNamePair>
  handleChange: (event: ChangeEvent<{ value: unknown }>) => void
  selectedLine: string
}

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(3),
    minWidth: 200
  }
}))

const LineSelect = ({
  lineNames,
  handleChange,
  selectedLine
}: Props): ReactElement => {
  const { formControl } = useStyles()
  return (
    <FormControl className={formControl}>
      <InputLabel id="line-select-label">Line</InputLabel>
      <Select
        labelId="line-select-label"
        id="line-select"
        value={selectedLine}
        onChange={(event) => handleChange(event)}
      >
        {lineNames.map((lineName) => (
          <MenuItem key={lineName.id} value={lineName.id}>
            {lineName.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export { LineSelect }
