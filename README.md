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
- Profile card: avatar, name, bio, followers, following, public repos, location, GitHub link
- Top 5 most-starred repositories with name, description, star count, and language
- Loading spinner, user not found (404), empty input, and API rate limit (60 req/hr) states all handled with clear messages
- Enter key support on search input

### Watchlist
- Save any searched user to a watchlist with one click (star icon button)
- Remove users from the watchlist — from both the search page and the watchlist page
- Watchlist persists across page refreshes using localStorage
- Filter saved users by name or username (client-side, instant)
- Stats panel: total users saved, average followers, most-used language, combined top-repo stars
- Empty state with a clear message and direct link back to search

### UI
- Dark / Light mode toggle with sun/moon icons
- Responsive layout — works on mobile, tablet, and desktop
- Clean minimal design with consistent spacing

## What I'd Improve With More Time

- Add a GitHub personal access token input so users can raise the API rate limit from 60 to 5,000 req/hr
- Show a user's pinned repositories (requires GitHub GraphQL API)
- Add a "recent searches" list that persists in localStorage across refreshes
- Add sorting options to the repo list (by language, fork count, etc.)

## What I Got Stuck On

- Tailwind v4 dark mode works differently from v3 — `darkMode: "class"` config doesn't exist anymore. Had to use `@variant dark` in CSS to make class-based dark mode work with the `@tailwindcss/vite` plugin
- GitHub's API rate limit (60 req/hr unauthenticated) returns a `403`, not a `429` — had to handle both status codes separately to show the right error message
