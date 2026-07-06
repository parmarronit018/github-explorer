# GitHub Explorer

A small React + Vite app (with Tailwind CSS) to search GitHub users and manage a personal watchlist.

## Quick start

```bash
git clone https://github.com/parmarronit018/github-explorer.git
cd github-explorer
npm install
npm run dev
```

Open http://localhost:5173 in your browser.

## What this repo contains

- `src/` — React source files
  - `components/` — reusable components (`SearchBar.jsx`, `UserCard.jsx`, ...)
  - `pages/` — top-level pages (`Home.jsx`, `Watchlist.jsx`)
  - `utils/api.js` — GitHub API helper
- `index.html`, `vite.config.js`, `package.json`

## Confirmed features

- Search input component to look up GitHub users (uses `utils/api.js`)
- `UserCard` component to display basic profile info (avatar, name, bio, followers, following, public repos)
- Top 5 most-starred repos displayed below the profile card
- Loading, "user not found", and empty/invalid input states handled
- Save/remove users to a personal **Watchlist**
- Watchlist page with search/filter and a stats panel (total saved, average followers)
- Data persists to `localStorage` so the watchlist survives a page refresh
- Tailwind CSS for styling

## Scripts

- `npm run dev` — start Vite dev server
- `npm run build` — build for production
- `npm run preview` — preview production build

## What I'd improve with more time

- Add debounce on the search input to reduce unnecessary API calls
- Handle GitHub's API rate limiting (60 req/hr unauthenticated) with a friendly message
- Add a dark/light mode toggle
- Add a "most-used language" stat to the Watchlist stats panel

## What I got stuck on

- GitHub's `sort=stars` query parameter on the repos endpoint didn't actually sort the results by stars as expected. I had to sort the repos manually on the client side using JavaScript's `.sort()` after fetching them.
- Deciding where to store the watchlist data (Context API vs simple state in the parent component) — went with simpler state + localStorage to keep it easy to follow.

## Notes

- If you plan to make many API requests during testing, consider using a GitHub personal access token to increase rate limits.

## Contributing

Feel free to open issues or PRs. For small changes, update the relevant files in `src/` and submit a PR.