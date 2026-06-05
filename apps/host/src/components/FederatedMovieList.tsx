import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import type { Movie } from "@repo/movies";
import { LoadingMovieGrid } from "@repo/ui";
import { useEffect, useRef, useState } from "react";

export interface FederatedMovieListProps {
  onSelectMovie: (movie: Movie) => void;
}

type MountStatus = "loading" | "ready" | "error";

export function FederatedMovieList({ onSelectMovie }: FederatedMovieListProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<MountStatus>("loading");

  useEffect(() => {
    const element = containerRef.current;

    if (!element) {
      return;
    }

    let isCancelled = false;
    let unmount: (() => void) | undefined;

    import("movieList/mount")
      .then(({ mountMovieList }) => {
        if (isCancelled) {
          return;
        }

        const handle = mountMovieList(element, { onSelectMovie });
        unmount = handle.unmount;
        setStatus("ready");
      })
      .catch(() => {
        if (!isCancelled) {
          setStatus("error");
        }
      });

    return () => {
      isCancelled = true;
      unmount?.();
    };
  }, [onSelectMovie]);

  return (
    <Stack sx={{ gap: 2 }}>
      {status === "loading" ? <LoadingMovieGrid /> : null}
      {status === "error" ? (
        <Alert severity="error">
          Movie list remote is unavailable. Confirm that its app is running and
          reload the page.
        </Alert>
      ) : null}
      <Box
        ref={containerRef}
        sx={{ display: status === "ready" ? "block" : "none" }}
      />
    </Stack>
  );
}
