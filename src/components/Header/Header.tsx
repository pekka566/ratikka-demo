import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import { ReactElement } from "react"

type Props = {
  title: string
}

const Header = ({ title }: Props): ReactElement => {
  return (
    <header>
      <AppBar
        position="relative"
        sx={{
          backgroundColor: "#0d113b",
          alignItems: "center"
        }}
      >
        <Toolbar>
          <Typography variant="h3" component="h1">
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
    </header>
  )
}

export { Header }
