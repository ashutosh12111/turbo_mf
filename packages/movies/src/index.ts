const DEFAULT_MOVIES_API_BASE_URL = "https://ghibliapi.vercel.app";

export const MOVIES_API_BASE_URL =
  process.env.NEXT_PUBLIC_MOVIES_API_BASE_URL ?? DEFAULT_MOVIES_API_BASE_URL;

interface StudioGhibliFilm {
  id: string;
  title: string;
  original_title: string;
  original_title_romanised: string;
  image: string;
  movie_banner: string;
  description: string;
  director: string;
  producer: string;
  release_date: string;
  running_time: string;
  rt_score: string;
}

export interface Movie {
  id: string;
  title: string;
  originalTitle: string;
  originalTitleRomanised: string;
  image: string;
  movieBanner: string;
  description: string;
  director: string;
  producer: string;
  releaseYear: string;
  runningTimeMinutes: number;
  score: number;
}

export class MoviesApiError extends Error {
  constructor(
    message: string,
    public readonly status?: number,
  ) {
    super(message);
    this.name = "MoviesApiError";
  }
}

function toMovie(film: StudioGhibliFilm): Movie {
  return {
    id: film.id,
    title: film.title,
    originalTitle: film.original_title,
    originalTitleRomanised: film.original_title_romanised,
    image: film.image,
    movieBanner: film.movie_banner,
    description: film.description,
    director: film.director,
    producer: film.producer,
    releaseYear: film.release_date,
    runningTimeMinutes: Number(film.running_time),
    score: Number(film.rt_score),
  };
}

async function request<T>(path: string, signal?: AbortSignal): Promise<T> {
  const response = await fetch(`${MOVIES_API_BASE_URL}${path}`, {
    headers: {
      Accept: "application/json",
    },
    signal,
  });

  if (!response.ok) {
    throw new MoviesApiError(
      `Movies API request failed with status ${response.status}.`,
      response.status,
    );
  }

  return (await response.json()) as T;
}

export async function getMovies(signal?: AbortSignal): Promise<Movie[]> {
  const films = await request<StudioGhibliFilm[]>("/films", signal);
  return films.map(toMovie);
}

export async function getMovie(
  movieId: string,
  signal?: AbortSignal,
): Promise<Movie> {
  const film = await request<StudioGhibliFilm>(
    `/films/${encodeURIComponent(movieId)}`,
    signal,
  );
  return toMovie(film);
}
