import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import MovieCreationRoundedIcon from "@mui/icons-material/MovieCreationRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { getMovie, type Movie } from "@repo/movies";
import { LoadingMovieGrid } from "@repo/ui";
import { useEffect, useState } from "react";

export interface MovieDetailsProps {
  movieId?: string;
}

export default function MovieDetails({ movieId }: MovieDetailsProps) {
  const [movie, setMovie] = useState<Movie>();
  const [error, setError] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!movieId) {
      setMovie(undefined);
      setError(undefined);
      setIsLoading(false);
      return;
    }

    const controller = new AbortController();
    setIsLoading(true);

    getMovie(movieId, controller.signal)
      .then((response) => {
        setMovie(response);
        setError(undefined);
      })
      .catch((requestError: unknown) => {
        if (!controller.signal.aborted) {
          setError(
            requestError instanceof Error
              ? requestError.message
              : "Unable to load this movie.",
          );
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      });

    return () => controller.abort();
  }, [movieId]);

  if (!movieId) {
    return (
      <Alert severity="info">
        Select a movie from the list to load the details remote.
      </Alert>
    );
  }

  if (isLoading) {
    return <LoadingMovieGrid count={1} />;
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  if (!movie) {
    return null;
  }

  return (
    <Card
      sx={{
        border: "1px solid rgba(255, 255, 255, 0.08)",
        overflow: "hidden",
      }}
    >
      <CardMedia
        alt={`${movie.title} scene`}
        component="img"
        image={movie.movieBanner}
        sx={{ height: { xs: 220, md: 420 }, objectFit: "cover" }}
      />
      <CardContent sx={{ p: { xs: 2.5, md: 4 } }}>
        <Stack sx={{ gap: 2.5 }}>
          <Box>
            <Typography component="h3" variant="h3">
              {movie.title}
            </Typography>
            <Typography color="text.secondary" variant="h6">
              {movie.originalTitle} ({movie.originalTitleRomanised})
            </Typography>
          </Box>
          <Stack direction="row" sx={{ flexWrap: "wrap", gap: 1 }}>
            <Chip label={movie.releaseYear} />
            <Chip
              icon={<AccessTimeRoundedIcon />}
              label={`${movie.runningTimeMinutes} minutes`}
            />
            <Chip
              color="primary"
              icon={<StarRoundedIcon />}
              label={`${movie.score}% audience score`}
              variant="outlined"
            />
          </Stack>
          <Typography color="text.secondary" variant="body1">
            {movie.description}
          </Typography>
          <Divider />
          <Stack
            direction={{ xs: "column", md: "row" }}
            sx={{ gap: { xs: 1.5, md: 4 } }}
          >
            <Stack direction="row" sx={{ alignItems: "center", gap: 1 }}>
              <MovieCreationRoundedIcon color="secondary" />
              <Typography>
                <strong>Director:</strong> {movie.director}
              </Typography>
            </Stack>
            <Stack direction="row" sx={{ alignItems: "center", gap: 1 }}>
              <PersonRoundedIcon color="secondary" />
              <Typography>
                <strong>Producer:</strong> {movie.producer}
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
