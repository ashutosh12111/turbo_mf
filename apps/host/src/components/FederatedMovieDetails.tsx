import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { LoadingMovieGrid } from "@repo/ui";
import { useEffect, useRef, useState } from "react";
import type { MovieDetailsMountHandle } from "movieView/mount";

export interface FederatedMovieDetailsProps {
  movieId?: string;
}

type MountStatus = "loading" | "ready" | "error";

export function FederatedMovieDetails({ movieId }: FederatedMovieDetailsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<MovieDetailsMountHandle | undefined>(undefined);
  const movieIdRef = useRef(movieId);
  const [status, setStatus] = useState<MountStatus>("loading");
  const [error, setError] = useState<string>();

  useEffect(() => {
    const element = containerRef.current;

    if (!element) {
      return;
    }

    let isCancelled = false;

    import("movieView/mount")
      .then(({ mountMovieDetails }) => {
        if (isCancelled) {
          return;
        }

        handleRef.current = mountMovieDetails(element, {
          movieId: movieIdRef.current,
        });
        setStatus("ready");
      })
      .catch((loadError: unknown) => {
        if (!isCancelled) {
          setError(
            loadError instanceof Error
              ? loadError.message
              : "Unknown remote loading error.",
          );
          setStatus("error");
        }
      });

    return () => {
      isCancelled = true;
      handleRef.current?.unmount();
      handleRef.current = undefined;
    };
  }, []);

  useEffect(() => {
    movieIdRef.current = movieId;
    handleRef.current?.update({ movieId });
  }, [movieId]);

  return (
    <Stack sx={{ gap: 2 }}>
      {status === "loading" ? <LoadingMovieGrid count={1} /> : null}
      {status === "error" ? (
        <Alert severity="error">
          Movie details remote is unavailable. Confirm that its app is running
          and reload the page. {error ? `Details: ${error}` : null}
        </Alert>
      ) : null}
      <Box
        ref={containerRef}
        sx={{ display: status === "ready" ? "block" : "none" }}
      />
    </Stack>
  );
}
