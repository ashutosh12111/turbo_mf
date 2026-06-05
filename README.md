# Movies Module Federation Turborepo

A learning-focused micro-frontend workspace with three independently runnable
Vite + React applications:

| App          | Port   | Responsibility                                           |
| ------------ | ------ | -------------------------------------------------------- |
| `host`       | `3000` | Composes the remote movie list and movie details modules |
| `movie-list` | `3001` | Lists Studio Ghibli films and exposes `mountMovieList`   |
| `movie-view` | `3002` | Displays one film and exposes `mountMovieDetails`        |

The shared `@repo/ui` package contains the MUI theme, header, movie card, and
loading UI. The shared `@repo/movies` package contains film types and the API
client for the public [Studio Ghibli API](https://ghibliapi.vercel.app/).

## Why Vite?

Next.js Module Federation support has been constrained by the deprecated
`@module-federation/nextjs-mf` adapter and the lack of App Router support. This
workspace now uses the official
[`@originjs/vite-plugin-federation`](https://github.com/originjs/vite-plugin-federation)
plugin so the federation layer is modeled directly in Vite without the
deprecated Next.js adapter.

The app still keeps the same teaching boundary:

- `movie-list` exposes `movieList/mount`.
- `movie-view` exposes `movieView/mount`.
- `host` imports those runtime modules after the page loads and mounts each
  remote into a placeholder element.

That small mount contract keeps the micro-frontend boundary easy to understand
while you are learning. Shared workspace packages are normal build-time code;
Module Federation supplies the independently built runtime modules.

## Getting Started

```bash
pnpm install
pnpm dev
```

`pnpm dev` runs the production-like federation loop: Turbo builds each app and
then serves the built Vite outputs on ports `3000`, `3001`, and `3002`. This is
the most reliable local workflow because the remotes publish real
`assets/remoteEntry.js` files from `dist`.

Open:

- Host composition: [http://localhost:3000](http://localhost:3000)
- Movie list remote: [http://localhost:3001](http://localhost:3001)
- Movie details remote: [http://localhost:3002](http://localhost:3002)

## Production-Like Preview

`pnpm dev` is already the recommended preview flow. You can also run the steps
manually:

```bash
pnpm build
pnpm --filter @repo/movie-list preview
pnpm --filter @repo/movie-view preview
pnpm --filter @repo/host preview
```

The remote apps publish `assets/remoteEntry.js` from their Vite build output,
and the host reads these URLs from environment variables.

For raw Vite dev servers with HMR, use:

```bash
pnpm dev:vite
```

Use that mode mainly while editing a standalone app. Always do a final
`pnpm dev` or `pnpm build` check for the composed Module Federation runtime.

## Useful Commands

```bash
pnpm format:check
pnpm lint
pnpm typecheck
pnpm build
```

## Runtime Configuration

The host accepts environment variables for independently deployed remotes:

```bash
VITE_MOVIE_LIST_REMOTE_URL=https://movies.example.com
VITE_MOVIE_VIEW_REMOTE_URL=https://movie.example.com
```

The shared API client and movie list remote also accept:

```bash
VITE_MOVIES_API_BASE_URL=https://ghibliapi.vercel.app
VITE_MOVIE_VIEW_APP_URL=https://movie.example.com
```

Remote apps use `VITE_PUBLIC_BASE_URL` when you deploy them away from their
local development ports. Copy each app's `.env.example` to `.env.local` when you
need overrides.

## Workspace Structure

```text
apps/
  host/
  movie-list/
  movie-view/
packages/
  movies/
  ui/
```

Each Vite app has its own `vite.config.ts`, `index.html`, and `src/main.tsx`.
The remotes expose their mount functions through Module Federation, while the
host keeps typed declarations in `apps/host/src/types/remotes.d.ts`.
