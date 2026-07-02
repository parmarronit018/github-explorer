import { useState } from "react";
import SearchBar from "../components/SearchBar";
import UserCard from "../components/UserCard";
import { fetchUserData, fetchUserRepos } from "../utils/api";

function Home({ watchlist, onSave, onRemove, darkMode, onSwitchTab }) {
  const [user, setUser]       = useState(null);
  const [repos, setRepos]     = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState(null);
  const [searched, setSearched] = useState(false);

  const card   = darkMode ? "#161b22" : "#ffffff";
  const border = darkMode ? "#30363d" : "#d0d7de";
  const muted  = darkMode ? "#8b949e" : "#57606a";
  const text   = darkMode ? "#e6edf3" : "#1f2328";

  const handleSearch = async (username) => {
    const clean = username.trim();
    if (!clean) {
      setError("Please enter a GitHub username.");
      setUser(null);
      setRepos([]);
      setSearched(false);
      return;
    }

    setLoading(true);
    setError(null);
    setUser(null);
    setRepos([]);
    setSearched(true);

    try {
      const [userData, repoData] = await Promise.all([
        fetchUserData(clean),
        fetchUserRepos(clean),
      ]);
      setUser(userData);
      setRepos(repoData);
      setError(null);
    } catch (err) {
      setUser(null);
      setRepos([]);
      if (err.message === "rate_limit") {
        setError("rate_limit");
      } else if (err.message === "not_found") {
        setError("not_found");
      } else {
        setError("generic");
      }
    } finally {
      setLoading(false);
    }
  };

  const isSaved = user && watchlist.some((u) => u.login === user.login);

  return (
    <div className="max-w-6xl mx-auto px-6 py-6">

      {/* Full-width search bar */}
      <SearchBar onSearch={handleSearch} darkMode={darkMode} />

      {/* Loading */}
      {loading && (
        <div className="flex flex-col items-center gap-3 mt-20">
          <div className="w-8 h-8 rounded-full border-4 animate-spin"
            style={{ borderColor: "#6e40c9", borderTopColor: "transparent" }} />
          <p className="text-sm" style={{ color: muted }}>Fetching user data...</p>
        </div>
      )}

      {/* Results layout */}
      {!loading && user && (
        <div className="mt-6 flex flex-col lg:flex-row gap-6 items-start">

          {/* Left — UserCard */}
          <div className="w-full lg:w-64 shrink-0">
            <UserCard user={user} darkMode={darkMode} />
            <button
              onClick={() => isSaved ? onRemove(user.login) : onSave(user, repos)}
              className="w-full mt-3 py-2.5 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-all duration-200 active:scale-95"
              style={{
                border: `1px solid ${darkMode ? "#4b5563" : "#d1d5db"}`,
                color: darkMode ? "#ffffff" : "#000000",
                backgroundColor: "transparent",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = darkMode ? "#1f2937" : "#f3f4f6";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              <svg width="13" height="13" viewBox="0 0 16 16" fill={darkMode ? "#ffffff" : "#000000"}>
                <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1
                  .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8
                  11.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818
                  6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z"/>
              </svg>
              {isSaved ? "Remove from Watchlist" : "Save to Watchlist"}
            </button>
          </div>

          {/* Right — Repos */}
          <div className="flex-1">
            <h3 className="text-base font-semibold mb-4" style={{ color: text }}>
              Top Repositories
            </h3>
            {repos.length === 0 ? (
              <p className="text-sm" style={{ color: muted }}>No public repositories found.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {repos.map((repo) => (
                  <RepoCard key={repo.id} repo={repo} darkMode={darkMode} />
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Error / not found state */}
      {!loading && searched && error && (
        <div
          className="mt-6 rounded-xl flex flex-col items-center justify-center py-16 gap-3"
          style={{ border: `1px solid ${border}` }}
        >
          {/* Search icon circle */}
          <div className="w-12 h-12 rounded-full flex items-center justify-center"
            style={{ border: "2px solid #6e40c9" }}>
            <svg width="20" height="20" viewBox="0 0 16 16" fill="#6e40c9">
              <path d="M10.68 11.74a6 6 0 0 1-7.922-8.982 6 6 0 0 1 8.982
                7.922l3.04 3.04a.749.749 0 0 1-.326 1.275.749.749 0 0
                1-.734-.215ZM11.5 7a4.499 4.499 0 1 0-8.997 0A4.499 4.499 0 0 0 11.5 7Z"/>
            </svg>
          </div>
          <p className="font-semibold text-sm" style={{ color: text }}>
            {error === "rate_limit"
              ? "API rate limit reached"
              : "Can't find the user you're looking for?"}
          </p>
          <p className="text-xs" style={{ color: muted }}>
            {error === "rate_limit"
              ? "GitHub allows 60 requests/hr. Please wait a few minutes."
              : "Make sure the username is correct and try again."}
          </p>
        </div>
      )}

      {/* Invalid input error */}
      {!searched && error && (
        <div className="mt-4 px-4 py-3 rounded-lg text-sm text-center"
          style={{ backgroundColor: darkMode ? "#1f1116" : "#fff5f5", border: "1px solid #6e2c3e", color: "#f85149" }}>
          {error}
        </div>
      )}
    </div>
  );
}

/* ── Repo card ─────────────────────────────────────────────────── */
function RepoCard({ repo, darkMode }) {
  const card   = darkMode ? "#161b22" : "#ffffff";
  const border = darkMode ? "#30363d" : "#d0d7de";
  const muted  = darkMode ? "#8b949e" : "#57606a";
  const text   = darkMode ? "#e6edf3" : "#1f2328";

  // Language badge colors
  const langColors = {
    JavaScript: { bg: "#2e2a05", text: "#e3b341", border: "#4d3e06" },
    TypeScript: { bg: "#051d3e", text: "#79c0ff", border: "#0c2e5c" },
    Python:     { bg: "#0d2a1f", text: "#3fb950", border: "#143d2c" },
    Ruby:       { bg: "#2e0d0d", text: "#ff7b72", border: "#4d1a1a" },
    Go:         { bg: "#051a2e", text: "#79c0ff", border: "#0c2e4a" },
    Rust:       { bg: "#2e1a0d", text: "#ffa657", border: "#4d2e14" },
    Java:       { bg: "#1a0d2e", text: "#c084fc", border: "#2e1a4d" },
    CSS:        { bg: "#0d1a2e", text: "#79c0ff", border: "#142e4a" },
    HTML:       { bg: "#2e1a0d", text: "#ffa657", border: "#4d2e14" },
  };
  const lc = langColors[repo.language] || { bg: "#21262d", text: "#8b949e", border: "#30363d" };

  return (
    <div
      className="rounded-xl p-4 flex flex-col gap-2 transition-all"
      style={{ backgroundColor: card, border: `1px solid ${border}` }}
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#6e40c9")}
      onMouseLeave={(e) => (e.currentTarget.style.borderColor = border)}
    >
      <div className="flex items-start justify-between gap-2">
        <span className="font-semibold text-sm" style={{ color: text }}>{repo.name}</span>
        <a
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs shrink-0 transition-colors"
          style={{ color: "#6e40c9" }}
          onMouseEnter={(e) => (e.target.style.color = "#9a6ee0")}
          onMouseLeave={(e) => (e.target.style.color = "#6e40c9")}
        >
          View
        </a>
      </div>

      <p className="text-xs flex-1 leading-relaxed" style={{ color: muted }}>
        {repo.description || "No description available"}
      </p>

      <div className="flex items-center gap-3 text-xs mt-auto" style={{ color: muted }}>
        {/* Star count */}
        <span className="flex items-center gap-1">
          <svg width="12" height="12" viewBox="0 0 16 16" fill={muted}>
            <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1
              .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8
              11.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818
              6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z"/>
          </svg>
          {repo.stargazers_count.toLocaleString()}
        </span>
        {/* Language badge */}
        {repo.language && (
          <span
            className="px-2 py-0.5 rounded-full text-xs"
            style={{ backgroundColor: lc.bg, color: lc.text, border: `1px solid ${lc.border}` }}
          >
            {repo.language}
          </span>
        )}
      </div>
    </div>
  );
}

export default Home;
