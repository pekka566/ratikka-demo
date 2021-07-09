import { ReactElement } from "react"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import { makeStyles } from "@material-ui/core"

type Props = {
  title: string
}

const useStyles = makeStyles(() => ({
  header: {
    backgroundColor: "#0d113b",
    alignItems: "center"
  }
}))

const Header = ({ title }: Props): ReactElement => {
  const { header } = useStyles()
  return (
    <header>
      <AppBar className={header} position="relative">
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
