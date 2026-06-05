import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Header } from "@repo/ui";
import { useEffect, useState } from "react";
import MovieDetails from "./components/MovieDetails";

function readMovieIdFromUrl() {
  return (
    new URLSearchParams(window.location.search).get("movieId") ?? undefined
  );
}

export default function App() {
  const [movieId, setMovieId] = useState(readMovieIdFromUrl);

  useEffect(() => {
    const syncMovieId = () => setMovieId(readMovieIdFromUrl());

    window.addEventListener("popstate", syncMovieId);
    return () => window.removeEventListener("popstate", syncMovieId);
  }, []);

  return (
    <>
      <Header
        appName="Movie Details Remote"
        links={[
          { href: "http://localhost:3000", label: "Host" },
          { href: "http://localhost:3001", label: "List remote" },
        ]}
      />
      <Box component="main" sx={{ minHeight: "calc(100vh - 72px)" }}>
        <Container maxWidth="lg">
          <Stack sx={{ gap: 3, py: { xs: 5, md: 7 } }}>
            <Box>
              <Typography component="h1" variant="h2">
                Movie Details Remote
              </Typography>
              <Typography color="text.secondary" variant="body1">
                This Vite app owns loading one selected film. Open it with a
                `movieId` query parameter, or let the host update it through
                `movieView/mount`.
              </Typography>
            </Box>
            <MovieDetails movieId={movieId} />
          </Stack>
        </Container>
      </Box>
    </>
  );
}
