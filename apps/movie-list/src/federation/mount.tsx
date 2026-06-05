import type { Movie } from "@repo/movies";
import { AppThemeProvider } from "@repo/ui";
import { createRoot } from "react-dom/client";
import MovieList from "../components/MovieList";

export interface MovieListMountProps {
  onSelectMovie?: (movie: Movie) => void;
}

export function mountMovieList(
  element: HTMLElement,
  props: MovieListMountProps,
) {
  const root = createRoot(element);

  root.render(
    <AppThemeProvider>
      <MovieList {...props} />
    </AppThemeProvider>,
  );

  return {
    unmount: () => root.unmount(),
  };
}
