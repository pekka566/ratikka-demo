import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent
} from "@mui/material"
import { ReactElement } from "react"
import { IdNamePair } from "../../types"

type Props = {
  lineNames: Array<IdNamePair>
  handleChange: (event: SelectChangeEvent<string>) => void
  selectedLine: string
}

const LineSelect = ({
  lineNames,
  handleChange,
  selectedLine
}: Props): ReactElement => {
  return (
    <FormControl sx={{ margin: 3, minWidth: 200 }}>
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
