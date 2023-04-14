import { Box, Button, Chip, PropTypes, TextField } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { ChangeEvent, useContext, useState } from "react";
import "./Movies.css";
import { MovieContext } from "../contexts/MovieContext";
import { ThemeContext } from "../contexts/ThemeContext";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    movieChip: {
      fontSize: "2rem",
      padding: "30px 10px",
      margin: "5px",
    },
    movieInput: {
      marginRight: "5px",
    },
  })
);

const Movies = () => {
  const classes = useStyles();

  //state
  const [movie, setMovie] = useState("");

  const onMovieInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setMovie(event.target.value);
  };

  //context
  const { theme } = useContext(ThemeContext);
  const chipTheme = theme as Exclude<PropTypes.Color, "inherit">;
  const { movies, addMovie, deleteMovie } = useContext(MovieContext);
  return (
    <>
      <Box className="movie-box1">
        <TextField
          label="Your favorite movie..."
          variant="outlined"
          className={classes.movieInput}
          onChange={onMovieInputChange}
          value={movie}
        />
        <Button
          variant="contained"
          color={chipTheme}
          onClick={() => {
            addMovie(movie);
            setMovie("");
          }}
        >
          Add
        </Button>
      </Box>

      <Box className="movie-box2">
        {movies.map((movie) => (
          <Chip
            key={movie.id}
            label={movie.title}
            clickable
            color={chipTheme}
            onDelete={deleteMovie.bind(this, movie.id)}
            className={classes.movieChip}
          />
        ))}
      </Box>
    </>
  );
};

export default Movies;
