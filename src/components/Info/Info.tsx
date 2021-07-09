import React, { ReactElement } from "react"
import { Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles((theme) => ({
  mainText: {
    marginTop: theme.spacing(5)
  }
}))

const Info = (): ReactElement => {
  const { mainText } = useStyles()
  return (
    <div className={mainText}>
      <Typography variant="h5" align="center" paragraph>
        Some text...
      </Typography>
    </div>
  )
}

export { Info }
