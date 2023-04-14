import { ReactNode, createContext, useReducer } from "react";
import { TopMovieState, topMovieReducer } from "../reducers/TopMovieReducer";
import axios from "axios";
import { TopMovieActionType } from "../reducers/types";
import topMoviesInfo from "../api/getTopMovies";

const { GET_TOP_MOVIES, TOGGLE_TOP_MOVIE_WATCHED } = TopMovieActionType;

interface TopMovieContextProps {
  children: ReactNode;
}

interface TopMovieContextDefault {
  topMovies: TopMovieState;
  getTopMovies: () => Promise<void>; // or: () => void
  toggleWatched: (id: string) => void;
}

const topMoviesDefault: TopMovieState = [];

export const TopMovieContext = createContext<TopMovieContextDefault>({
  topMovies: topMoviesDefault,
  getTopMovies: () => Promise.resolve(void 0), // then here it can be () => null or () => {}
  toggleWatched: (id: string) => {},
});

const TopMovieContextProvider = ({ children }: TopMovieContextProps) => {
  const [topMovies, dispatch] = useReducer(topMovieReducer, topMoviesDefault);

  // get top movies from api
  const getTopMovies = async () => {
    const topMovies = await Promise.all(topMoviesInfo);
    dispatch({
      type: GET_TOP_MOVIES,
      payload: topMovies.map((topMovie) => ({
        ...topMovie.data,
        Watched: false,
      })),
    });
  };

  //toggle watch

  const toggleWatched = (imdbID: string) =>
    dispatch({ type: TOGGLE_TOP_MOVIE_WATCHED, payload: imdbID });

  const topMovieContextData = {
    topMovies,
    getTopMovies,
    toggleWatched,
  };
  return (
    <TopMovieContext.Provider value={topMovieContextData}>
      {children}
    </TopMovieContext.Provider>
  );
};

export default TopMovieContextProvider;
