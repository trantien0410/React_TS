import { Box } from "@material-ui/core";
import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import "./TopMovies.css";
interface WelcomeMessageProps {
  position: string;
  country?: string;
}

const WelcomeMessage = ({
  position,
  country = "Vietnam",
}: WelcomeMessageProps) => {
  const {
    authInfo: { username },
  } = useContext(AuthContext);
  return (
    <Box className="box-message">
      Welcome, {username} - {position} from {country}
    </Box>
  );
};

export default WelcomeMessage;
