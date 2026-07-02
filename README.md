# GitHub Explorer

A React + Tailwind CSS app to search any GitHub username, explore their profile and top repositories, and manage a personal watchlist.

## How to Run

```bash
git clone https://github.com/parmarronit018/github-explorer.git
cd github-explorer
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## Features

### Search
- Search any GitHub username via the public GitHub API
- Profile card: avatar, name, bio, followers, following, public repos, location
- Clickable `@username` and GitHub profile URL link (opens in new tab)
- Top 5 most-starred repositories with name, description, star count, and language badge
- External link icon (↗) on each repo card to open directly on GitHub
- Loading spinner while fetching data
- User not found (404), empty input, and API rate limit (60 req/hr) errors handled with clear messages
- Enter key support on search input
- Search icon inside input field for better UX

### Watchlist
- Save any searched user with one click (star icon button)
- Save/Remove toggle button — theme-aware (white filled in dark mode, black filled in light mode)
- Remove users from the watchlist from both the search page and the watchlist page
- Watchlist persists across page refreshes using localStorage
- Clickable `@username` in watchlist rows — opens GitHub profile in new tab
- View button (GitHub default style) and Remove button (GitHub danger red style) on each row
- Filter saved users by name or username (client-side, instant search)
- Stats panel (always visible):
  - Total users saved
  - Average followers across saved users
  - Most-used language (aggregated from top repos)
  - Combined top-repo stars across all saved users
- Empty state with icon, message, and "Search Users" button to redirect back

### UI / UX
- Dark / Light mode toggle with sun/moon SVG icons — all colors adapt to theme
- GitHub design system color palette throughout
- Active tab (Search / Watchlist) shown as filled button; inactive as plain text
- Consistent button styles — View, Remove, Save, Search all theme-aware
- Fully responsive layout — works on mobile, tablet, and desktop
- Navbar stays on one line on all screen sizes (no text wrapping)
- Footer always stays at the bottom using flex layout
- Clean minimal design inspired by GitHub's own UI

## Tech Stack

- React 19 (Vite)
- Tailwind CSS v4
- GitHub REST API (public, no authentication required)

## What I'd Improve With More Time

- Add GitHub personal access token input to raise API rate limit from 60 to 5,000 req/hr
- Show user's pinned repositories using GitHub GraphQL API
- Display user organizations on the profile card
- Add "recent searches" list persisted in localStorage across refreshes

## What I Got Stuck On

- Tailwind v4 dark mode works differently from v3 — `darkMode: "class"` config doesn't exist anymore. Had to research and use `@variant dark` in CSS to make class-based dark mode work with the `@tailwindcss/vite` plugin.
- GitHub's API rate limit (60 req/hr unauthenticated) returns a `403` status code, not `429` as I initially expected. Had to handle both status codes separately to show accurate error messages to users.
- Balancing the watchlist stats calculations — aggregating language data from nested repo arrays required careful state management to avoid recalculating on every render.
