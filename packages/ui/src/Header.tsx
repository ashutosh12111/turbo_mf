import MovieFilterRoundedIcon from "@mui/icons-material/MovieFilterRounded";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

export interface HeaderLink {
  href: string;
  label: string;
}

export interface HeaderProps {
  appName: string;
  links?: readonly HeaderLink[];
}

export function Header({ appName, links = [] }: HeaderProps) {
  return (
    <AppBar
      elevation={0}
      position="sticky"
      sx={{
        backdropFilter: "blur(18px)",
        backgroundColor: "rgba(9, 17, 31, 0.84)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ minHeight: 72 }}>
          <MovieFilterRoundedIcon color="primary" sx={{ mr: 1.25 }} />
          <Typography
            component="a"
            href="/"
            variant="h6"
            sx={{
              color: "text.primary",
              fontWeight: 800,
              letterSpacing: "-0.04em",
              textDecoration: "none",
            }}
          >
            {appName}
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Stack direction="row" spacing={0.5}>
            {links.map((link) => (
              <Button color="inherit" href={link.href} key={link.href}>
                {link.label}
              </Button>
            ))}
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
