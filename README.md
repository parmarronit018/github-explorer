# GitHub Explorer

A React app to search any GitHub username and view their profile card, top repositories, and manage a personal watchlist of saved users.

## Features

- Search any GitHub username and fetch their profile (avatar, name, bio, followers, following, public repo count)
- View their top 5 most-starred repositories with name, description, stars, and language
- Loading, error (user not found), and empty-input states handled gracefully
- Save searched users to a **Watchlist**
- Watchlist view with:
  - Search/filter saved users
  - Stats panel (total saved users, average followers)
  - Remove saved users
  - Clean empty state when no users are saved

## Tech Stack

- React (Vite)
- Tailwind CSS
- GitHub REST API

## How to Run

1. Clone the repository
```bash
   git clone https://github.com/parmarronit018/github-explorer.git
   cd github-explorer
```
2. Install dependencies
```bash
   npm install
```
3. Start the dev server
```bash
   npm run dev
```
4. Open the app at `http://localhost:5173`

## What I'd Improve With More Time

- Add localStorage so the watchlist persists across page refreshes
- Add a debounce on search input to avoid unnecessary API calls
- Handle GitHub's API rate limiting (60 req/hr unauthenticated) with a clearer message
- Add a dark/light mode toggle
- Break the repo list into its own reusable component for cleaner structure

## What I Got Stuck On

- Setting up Tailwind CSS with Vite took a few tries to get the import in the right file (`index.css` vs `main.jsx`)
- GitHub's `sort=stars` query parameter doesn't actually work on the repos API — had to fetch repos and sort them client-side by `stargazers_count` to get the true top 5