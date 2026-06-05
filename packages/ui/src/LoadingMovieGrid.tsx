import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

export interface LoadingMovieGridProps {
  count?: number;
}

export function LoadingMovieGrid({ count = 6 }: LoadingMovieGridProps) {
  return (
    <Stack
      sx={{
        display: "grid",
        gap: 2.5,
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
      }}
    >
      {Array.from({ length: count }, (_, index) => (
        <Card key={index}>
          <Skeleton height={320} variant="rectangular" />
          <CardContent>
            <Skeleton height={30} width="72%" />
            <Skeleton height={20} width="45%" />
            <Skeleton height={20} width="92%" />
          </CardContent>
        </Card>
      ))}
    </Stack>
  );
}
