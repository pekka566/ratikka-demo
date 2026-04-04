import { Typography, Box } from "@mui/material"
import React, { ReactElement } from "react"

const Info = (): ReactElement => {
  return (
    <Box sx={{ marginTop: 5 }}>
      <Typography variant="h5" align="center" paragraph>
        Some text...
      </Typography>
    </Box>
  )
}

export { Info }
