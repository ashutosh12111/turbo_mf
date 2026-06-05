import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import type { Movie } from "@repo/movies";

export interface MovieCardProps {
  movie: Movie;
  onSelect: (movie: Movie) => void;
}

export function MovieCard({ movie, onSelect }: MovieCardProps) {
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        overflow: "hidden",
        transition: "transform 180ms ease, border-color 180ms ease",
        border: "1px solid rgba(255, 255, 255, 0.08)",
        "&:hover": {
          borderColor: "rgba(246, 196, 83, 0.6)",
          transform: "translateY(-5px)",
        },
      }}
    >
      <CardMedia
        alt={`${movie.title} poster`}
        component="img"
        image={movie.image}
        loading="lazy"
        sx={{ height: 320, objectFit: "cover" }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Stack spacing={1.4}>
          <Box>
            <Typography component="h3" variant="h6">
              {movie.title}
            </Typography>
            <Typography color="text.secondary" variant="body2">
              {movie.originalTitleRomanised}
            </Typography>
          </Box>
          <Stack direction="row" sx={{ flexWrap: "wrap", gap: 0.75 }}>
            <Chip label={movie.releaseYear} size="small" />
            <Chip
              icon={<AccessTimeRoundedIcon />}
              label={`${movie.runningTimeMinutes} min`}
              size="small"
            />
            <Chip
              color="primary"
              icon={<StarRoundedIcon />}
              label={`${movie.score}%`}
              size="small"
              variant="outlined"
            />
          </Stack>
          <Typography
            color="text.secondary"
            sx={{
              display: "-webkit-box",
              overflow: "hidden",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 3,
            }}
            variant="body2"
          >
            {movie.description}
          </Typography>
        </Stack>
      </CardContent>
      <CardActions sx={{ px: 2, pb: 2 }}>
        <Button onClick={() => onSelect(movie)} variant="contained">
          View details
        </Button>
      </CardActions>
    </Card>
  );
}
