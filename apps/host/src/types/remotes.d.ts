declare module "movieList/mount" {
  import type { Movie } from "@repo/movies";

  export interface MovieListMountProps {
    onSelectMovie?: (movie: Movie) => void;
  }

  export interface MovieListMountHandle {
    unmount: () => void;
  }

  export function mountMovieList(
    element: HTMLElement,
    props: MovieListMountProps,
  ): MovieListMountHandle;
}

declare module "movieView/mount" {
  export interface MovieDetailsMountProps {
    movieId?: string;
  }

  export interface MovieDetailsMountHandle {
    unmount: () => void;
    update: (props: MovieDetailsMountProps) => void;
  }

  export function mountMovieDetails(
    element: HTMLElement,
    props: MovieDetailsMountProps,
  ): MovieDetailsMountHandle;
}
