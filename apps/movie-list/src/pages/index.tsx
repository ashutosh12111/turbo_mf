import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Header } from "@repo/ui";
import Head from "next/head";
import MovieList from "../components/MovieList";

export default function MovieListPage() {
  return (
    <>
      <Head>
        <title>Movie List Remote | Ghibli Shelf</title>
      </Head>
      <Header appName="Movie List Remote" />
      <Box component="main">
        <Container maxWidth="xl">
          <Stack sx={{ gap: 3, py: { xs: 5, md: 7 } }}>
            <Box>
              <Typography component="h1" variant="h3">
                Studio Ghibli films
              </Typography>
              <Typography color="text.secondary">
                Standalone view of the movie list remote on port 3001.
              </Typography>
            </Box>
            <MovieList />
          </Stack>
        </Container>
      </Box>
    </>
  );
}
