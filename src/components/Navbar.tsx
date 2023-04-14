import {
  AppBar,
  Button,
  Chip,
  FormControl,
  MenuItem,
  Select,
} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import WelcomeMessage from "./WelcomeMessage";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import "./Navbar.css";
import { ProgressContext } from "../contexts/ProgressContext";
import { ThemeContext } from "../contexts/ThemeContext";
import Login from "./Login";
import { AuthContext } from "../contexts/AuthContext";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    positionSelect: {
      color: "white",
      borderBottom: "1px solid white",
    },
  })
);
const Navbar = () => {
  //styles
  const classes = useStyles();

  //contexts
  const { lastTime, status } = useContext(ProgressContext);
  const { theme } = useContext(ThemeContext);
  const {authInfo: {isAuthenticated}, toggleAuth} = useContext(AuthContext);

  //state
  const [position, setPosition] = useState<string>("Full-Stack-Developer");

  const [time, setTime] = useState<Date>(() => new Date(Date.now()));

  const [loginOpen, setLoginOpen] = useState(false);

  //useEffects
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date(Date.now())), 1000);
    return () => clearInterval(timer);
  }, []);

  const onPositionChange = (
    event: ChangeEvent<{
      value: unknown;
    }>
  ) => setPosition(event.target.value as string);

  return (
    <AppBar position="static" color={theme}>
      <Toolbar>
        <Box
          className="head-container"
          // display="flex"
          // justifyContent="space-between"
          // alignItems="center"
          // width={1}
          // py={2}
        >
          <Typography variant="h6">My Movies</Typography>

          <Box className="head-sub">
            <WelcomeMessage position={position} />
            <Chip
              label={`Last time working on this project: ${lastTime} - Status: ${status}`}
            />
            <Box mt={1}>
              <FormControl>
                <Select
                  value={position}
                  onChange={onPositionChange}
                  className={classes.positionSelect}
                >
                  <MenuItem value="Full-Stack-Developer">
                    Full-Stack-Developer
                  </MenuItem>
                  <MenuItem value="Back-End Developer">
                    Back-End Developer
                  </MenuItem>
                  <MenuItem value="Front-End Developer">
                    Front-End Developer
                  </MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>
          <Box className="head-three">
            <Box my={1}>
              <Typography variant="h6">{time.toUTCString()}</Typography>
            </Box>
            <Button variant="contained" onClick={isAuthenticated ? toggleAuth.bind(this, ""):setLoginOpen.bind(this, true)}>
              {isAuthenticated ? "Logout" : "Login"}
            </Button>
          </Box>

          <Login isOpen={loginOpen} handleClose={setLoginOpen} />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
