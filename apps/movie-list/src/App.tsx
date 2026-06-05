import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Header } from "@repo/ui";
import MovieList from "./components/MovieList";

export default function App() {
  return (
    <>
      <Header
        appName="Movie List Remote"
        links={[
          { href: "http://localhost:3000", label: "Host" },
          { href: "http://localhost:3002", label: "Details remote" },
        ]}
      />
      <Box component="main" sx={{ minHeight: "calc(100vh - 72px)" }}>
        <Container maxWidth="xl">
          <Stack sx={{ gap: 3, py: { xs: 5, md: 7 } }}>
            <Box>
              <Typography component="h1" variant="h2">
                Movie List Remote
              </Typography>
              <Typography color="text.secondary" variant="body1">
                This Vite app owns fetching, filtering, and selecting the movie
                catalog. The host consumes it through `movieList/mount`.
              </Typography>
            </Box>
            <MovieList />
          </Stack>
        </Container>
      </Box>
    </>
  );
}
