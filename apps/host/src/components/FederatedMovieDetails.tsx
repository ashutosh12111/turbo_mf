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
  const handleRef = useRef<MovieDetailsMountHandle>();
  const movieIdRef = useRef(movieId);
  const [status, setStatus] = useState<MountStatus>("loading");

  movieIdRef.current = movieId;

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
      .catch(() => {
        if (!isCancelled) {
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
    handleRef.current?.update({ movieId });
  }, [movieId]);

  return (
    <Stack sx={{ gap: 2 }}>
      {status === "loading" ? <LoadingMovieGrid count={1} /> : null}
      {status === "error" ? (
        <Alert severity="error">
          Movie details remote is unavailable. Confirm that its app is running
          and reload the page.
        </Alert>
      ) : null}
      <Box
        ref={containerRef}
        sx={{ display: status === "ready" ? "block" : "none" }}
      />
    </Stack>
  );
}
