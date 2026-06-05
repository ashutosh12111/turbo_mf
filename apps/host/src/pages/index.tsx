import ArrowDownwardRoundedIcon from "@mui/icons-material/ArrowDownwardRounded";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import type { Movie } from "@repo/movies";
import { Header } from "@repo/ui";
import Head from "next/head";
import { useCallback, useRef, useState } from "react";
import { FederatedMovieDetails } from "../components/FederatedMovieDetails";
import { FederatedMovieList } from "../components/FederatedMovieList";

export default function HomePage() {
  const [selectedMovieId, setSelectedMovieId] = useState<string>();
  const detailsRef = useRef<HTMLDivElement>(null);

  const handleSelectMovie = useCallback((movie: Movie) => {
    setSelectedMovieId(movie.id);
    window.requestAnimationFrame(() => {
      detailsRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  }, []);

  return (
    <>
      <Head>
        <title>Ghibli Shelf | Federated Movies</title>
        <meta
          content="A Next.js and Module Federation movie catalog built with Turborepo."
          name="description"
        />
      </Head>
      <Header
        appName="Ghibli Shelf"
        links={[
          { href: "#movies", label: "Movies" },
          { href: "#details", label: "Selected movie" },
        ]}
      />
      <Box
        component="main"
        sx={{
          background:
            "radial-gradient(circle at top right, rgba(120, 220, 202, 0.14), transparent 32rem)",
          minHeight: "calc(100vh - 72px)",
        }}
      >
        <Container maxWidth="xl">
          <Stack sx={{ gap: { xs: 7, md: 10 }, py: { xs: 7, md: 10 } }}>
            <Stack sx={{ alignItems: "flex-start", gap: 2.25, maxWidth: 820 }}>
              <Chip
                color="secondary"
                icon={<AutoAwesomeRoundedIcon />}
                label="Three apps, one movie shelf"
                variant="outlined"
              />
              <Typography component="h1" variant="h1">
                Discover the films. See the federation boundaries.
              </Typography>
              <Typography color="text.secondary" variant="h6">
                The shell composes a movie list from one Next.js remote and a
                details panel from another. Shared cards, headers, theme, and
                API types live in workspace packages.
              </Typography>
              <Button
                endIcon={<ArrowDownwardRoundedIcon />}
                href="#movies"
                size="large"
                variant="contained"
              >
                Browse the catalog
              </Button>
            </Stack>

            <Stack component="section" id="movies" sx={{ gap: 3 }}>
              <Box>
                <Typography component="h2" variant="h3">
                  Movie list remote
                </Typography>
                <Typography color="text.secondary">
                  Served independently by the app running on port 3001.
                </Typography>
              </Box>
              <FederatedMovieList onSelectMovie={handleSelectMovie} />
            </Stack>

            <Stack
              component="section"
              id="details"
              ref={detailsRef}
              sx={{ gap: 3 }}
            >
              <Box>
                <Typography component="h2" variant="h3">
                  Movie details remote
                </Typography>
                <Typography color="text.secondary">
                  Served independently by the app running on port 3002.
                </Typography>
              </Box>
              <FederatedMovieDetails movieId={selectedMovieId} />
            </Stack>
          </Stack>
        </Container>
      </Box>
    </>
  );
}
