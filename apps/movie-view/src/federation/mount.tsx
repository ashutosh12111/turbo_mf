import { AppThemeProvider } from "@repo/ui";
import { createRoot } from "react-dom/client";
import MovieDetails, {
  type MovieDetailsProps,
} from "../components/MovieDetails";

export function mountMovieDetails(
  element: HTMLElement,
  initialProps: MovieDetailsProps,
) {
  const root = createRoot(element);
  const update = (props: MovieDetailsProps) => {
    root.render(
      <AppThemeProvider>
        <MovieDetails {...props} />
      </AppThemeProvider>,
    );
  };

  update(initialProps);

  return {
    unmount: () => root.unmount(),
    update,
  };
}
