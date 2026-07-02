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
- Recent searches (last 5, in-memory) shown as clickable chips

### Watchlist
- Save any searched user to a watchlist with one click
- Watchlist persists across page refreshes using localStorage
- Remove users from the watchlist — from both the search page and the watchlist page
- Filter saved users by name or username (client-side, instant)
- Stats panel: total users saved, average followers, most-used language, combined top-repo stars

### UI
- Dark / Light mode toggle with sun/moon icons
- Responsive layout — works on mobile, tablet, and desktop
- Clean minimal design — no gradients, consistent spacing

## What I'd Improve With More Time

- Add a GitHub personal access token input so users can raise the API rate limit from 60 to 5,000 req/hr
- Show a user's pinned repositories (requires GitHub GraphQL API)
- Add sorting and filtering options to the repo list (by language, fork count, etc.)
- Persist recent searches to localStorage so they survive page refresh
