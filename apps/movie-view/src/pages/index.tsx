import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Header } from "@repo/ui";
import Head from "next/head";
import { useRouter } from "next/router";
import MovieDetails from "../components/MovieDetails";

export default function MovieDetailsPage() {
  const router = useRouter();
  const movieId =
    typeof router.query.movieId === "string" ? router.query.movieId : undefined;

  return (
    <>
      <Head>
        <title>Movie Details Remote | Ghibli Shelf</title>
      </Head>
      <Header appName="Movie Details Remote" />
      <Box component="main">
        <Container maxWidth="lg">
          <Stack sx={{ gap: 3, py: { xs: 5, md: 7 } }}>
            <Box>
              <Typography component="h1" variant="h3">
                Film details
              </Typography>
              <Typography color="text.secondary">
                Standalone view of the movie details remote on port 3002.
              </Typography>
            </Box>
            <MovieDetails movieId={movieId} />
          </Stack>
        </Container>
      </Box>
    </>
  );
}
