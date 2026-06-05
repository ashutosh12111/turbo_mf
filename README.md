# Movies Module Federation Turborepo

A learning-focused micro-frontend workspace with three independently runnable
Next.js applications:

| App          | Port   | Responsibility                                           |
| ------------ | ------ | -------------------------------------------------------- |
| `host`       | `3000` | Composes the remote movie list and movie details modules |
| `movie-list` | `3001` | Lists Studio Ghibli films and exposes `mountMovieList`   |
| `movie-view` | `3002` | Displays one film and exposes `mountMovieDetails`        |

The shared `@repo/ui` package contains the MUI theme, header, movie card, and
loading UI. The shared `@repo/movies` package contains film types and the API
client for the public [Studio Ghibli API](https://ghibliapi.vercel.app/).

## Why Pages Router?

The official
[`@module-federation/nextjs-mf` documentation](https://module-federation.io/guide/framework/nextjs.html)
supports Next.js `12` through `15`, SSR, and the Pages Router. It also states
that Next.js support is ending and that the App Router is not supported. This
repo therefore pins Next.js `15.5.19` and uses the Pages Router deliberately.

This is a solid teaching project and a realistic example of production coding
standards around a constrained integration. For a new long-lived production
system, treat the adapter's maintenance status as an architecture decision that
needs explicit review.

## Compatibility Pins

The federation adapter relies on Webpack and Next.js internals. This workspace
therefore pins:

```text
@module-federation/nextjs-mf  8.8.31
webpack                       5.99.9
enhanced-resolve               5.18.1
```

The `enhanced-resolve` version is enforced with a pnpm override. During setup,
newer transitive resolver releases broke the Next.js optional peer resolver, and
the latest federation adapter injected a Node-only runtime import into the
browser bundle. Run the complete `pnpm build` suite when evaluating upgrades to
any of these packages.

## Federation Boundary

The host uses browser-side federation and mounts both remote modules after
hydration. Each remote still renders its own standalone Next.js page on the
server, but the host composes their isolated React roots in the browser. This
keeps the learning example focused and avoids coupling the shell to the
deprecated adapter's server container runtime.

## Getting Started

```bash
pnpm install
pnpm dev
```

Open:

- Host composition: [http://localhost:3000](http://localhost:3000)
- Movie list remote: [http://localhost:3001](http://localhost:3001)
- Movie details remote: [http://localhost:3002](http://localhost:3002)

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
MOVIE_LIST_REMOTE_URL=https://movies.example.com
MOVIE_VIEW_REMOTE_URL=https://movie.example.com
```

The shared API client and movie list remote also accept:

```bash
NEXT_PUBLIC_MOVIES_API_BASE_URL=https://ghibliapi.vercel.app
NEXT_PUBLIC_MOVIE_VIEW_APP_URL=https://movie.example.com
```

Copy each app's `.env.example` to `.env.local` when you need overrides.

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

The host imports the runtime modules as `movieList/mount` and `movieView/mount`.
Each remote exposes a small mount function in its own `next.config.mjs`. The
mount function owns a React root inside a host placeholder, keeping framework
instances isolated while typed callbacks carry user actions back to the shell.
Workspace packages are build-time shared code, while Module Federation supplies
independently deployed runtime code.
