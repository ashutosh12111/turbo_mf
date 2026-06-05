import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import Alert from "@mui/material/Alert";
import InputAdornment from "@mui/material/InputAdornment";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { getMovies, MOVIE_SELECTED_EVENT, type Movie } from "@repo/movies";
import { LoadingMovieGrid, MovieCard } from "@repo/ui";
import { useEffect, useMemo, useState } from "react";

const movieViewAppUrl =
  import.meta.env.VITE_MOVIE_VIEW_APP_URL ?? "http://localhost:3002";

export interface MovieListProps {
  onSelectMovie?: (movie: Movie) => void;
}

export default function MovieList({ onSelectMovie }: MovieListProps) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [query, setQuery] = useState("");
  const [error, setError] = useState<string>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    getMovies(controller.signal)
      .then((response) => {
        setMovies(response);
        setError(undefined);
      })
      .catch((requestError: unknown) => {
        if (!controller.signal.aborted) {
          setError(
            requestError instanceof Error
              ? requestError.message
              : "Unable to load movies.",
          );
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      });

    return () => controller.abort();
  }, []);

  const filteredMovies = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return movies;
    }

    return movies.filter((movie) =>
      [movie.title, movie.originalTitleRomanised, movie.director].some(
        (value) => value.toLowerCase().includes(normalizedQuery),
      ),
    );
  }, [movies, query]);

  const dispatchMovieSelection = (movie: Movie) => {
    const event = new CustomEvent<Movie>(MOVIE_SELECTED_EVENT, {
      cancelable: true,
      detail: movie,
    });

    return window.dispatchEvent(event);
  };

  const handleSelectMovie = (movie: Movie) => {
    if (!dispatchMovieSelection(movie)) {
      return;
    }

    if (onSelectMovie) {
      onSelectMovie(movie);
      return;
    }

    window.location.assign(
      `${movieViewAppUrl}/?movieId=${encodeURIComponent(movie.id)}`,
    );
  };

  if (isLoading) {
    return <LoadingMovieGrid />;
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <Stack sx={{ gap: 2.5 }}>
      <TextField
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchRoundedIcon />
              </InputAdornment>
            ),
          },
        }}
        label="Search title or director"
        onChange={(event) => setQuery(event.target.value)}
        value={query}
      />
      <Typography color="text.secondary" variant="body2">
        Showing {filteredMovies.length} of {movies.length} films
      </Typography>
      {filteredMovies.length ? (
        <Stack
          sx={{
            display: "grid",
            gap: 2.5,
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          }}
        >
          {filteredMovies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onSelect={handleSelectMovie}
            />
          ))}
        </Stack>
      ) : (
        <Alert severity="info">No films match that search.</Alert>
      )}
    </Stack>
  );
}
