import { useState } from "react";
import SearchBar from "../components/SearchBar";
import UserCard from "../components/UserCard";
import { fetchUserData, fetchUserRepos } from "../utils/api";

function Home({ watchlist, onSave }) {
  const [user, setUser]       = useState(null);
  const [repos, setRepos]     = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState(null);
  const [recentSearches, setRecentSearches] = useState([]);

  const handleSearch = async (username) => {
    const clean = username.trim();

    if (!clean) {
      setError("Please enter a GitHub username.");
      setUser(null);
      setRepos([]);
      return;
    }

    setLoading(true);
    setError(null);
    setUser(null);
    setRepos([]);

    try {
      const [userData, repoData] = await Promise.all([
        fetchUserData(clean),
        fetchUserRepos(clean),
      ]);
      setUser(userData);
      setRepos(repoData);

      setRecentSearches((prev) => {
        const filtered = prev.filter((s) => s.toLowerCase() !== clean.toLowerCase());
        return [clean, ...filtered].slice(0, 5);
      });
    } catch (err) {
      if (err.message === "rate_limit") {
        setError("GitHub API rate limit reached (60 req/hr). Please wait a few minutes.");
      } else if (err.message === "not_found") {
        setError(`User "${clean}" not found.`);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const isSaved = user && watchlist.some((u) => u.login === user.login);

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">

      {/* Full-width search bar */}
      <SearchBar onSearch={handleSearch} />

      {/* Recent searches */}
      {recentSearches.length > 0 && !user && !loading && (
        <div className="flex flex-wrap items-center gap-2 mt-4">
          <span className="text-xs" style={{ color: "#8b949e" }}>Recent:</span>
          {recentSearches.map((s) => (
            <button
              key={s}
              onClick={() => handleSearch(s)}
              className="px-3 py-1 rounded-full text-xs transition-colors"
              style={{ backgroundColor: "#161b22", border: "1px solid #30363d", color: "#8b949e" }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#6e40c9"; e.currentTarget.style.color = "#e6edf3"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#30363d"; e.currentTarget.style.color = "#8b949e"; }}
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="flex flex-col items-center gap-3 mt-20">
          <div
            className="w-8 h-8 rounded-full border-4 animate-spin"
            style={{ borderColor: "#6e40c9", borderTopColor: "transparent" }}
          />
          <p className="text-sm" style={{ color: "#8b949e" }}>Fetching user data...</p>
        </div>
      )}

      {/* Error */}
      {error && (
        <div
          className="mt-6 px-4 py-3 rounded-lg text-sm text-center"
          style={{ backgroundColor: "#1f1116", border: "1px solid #6e2c3e", color: "#f85149" }}
        >
          {error}
        </div>
      )}

      {/* Results: user card + repos side by side */}
      {user && !loading && (
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Left col: user card + save button */}
          <div className="lg:col-span-1 flex flex-col gap-3">
            <UserCard user={user} />
            <button
              onClick={() => onSave(user, repos)}
              disabled={isSaved}
              className="w-full py-2.5 rounded-lg text-sm font-medium transition-all"
              style={
                isSaved
                  ? { backgroundColor: "#161b22", color: "#8b949e", border: "1px solid #30363d", cursor: "not-allowed" }
                  : { backgroundColor: "#6e40c9", color: "#ffffff", border: "1px solid #6e40c9" }
              }
              onMouseEnter={(e) => { if (!isSaved) e.currentTarget.style.backgroundColor = "#7c4dca"; }}
              onMouseLeave={(e) => { if (!isSaved) e.currentTarget.style.backgroundColor = "#6e40c9"; }}
            >
              {isSaved ? "Saved to Watchlist" : "Save to Watchlist"}
            </button>
          </div>

          {/* Right col: repos */}
          <div className="lg:col-span-2">
            <p className="text-xs font-semibold mb-3 tracking-widest" style={{ color: "#8b949e" }}>
              TOP REPOSITORIES
            </p>

            {repos.length === 0 ? (
              <p className="text-sm" style={{ color: "#8b949e" }}>
                No public repositories found.
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {repos.map((repo) => (
                  <div
                    key={repo.id}
                    className="rounded-xl p-4 flex flex-col gap-2 transition-all"
                    style={{ backgroundColor: "#161b22", border: "1px solid #30363d" }}
                    onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#6e40c9")}
                    onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#30363d")}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="font-semibold text-sm" style={{ color: "#e6edf3" }}>
                        {repo.name}
                      </span>
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

                    <p className="text-xs flex-1" style={{ color: "#8b949e" }}>
                      {repo.description || "No description available"}
                    </p>

                    <div className="flex items-center gap-3 text-xs" style={{ color: "#8b949e" }}>
                      <span>{repo.stargazers_count.toLocaleString()} stars</span>
                      {repo.language && (
                        <span
                          className="px-2 py-0.5 rounded-full"
                          style={{ backgroundColor: "#1f2d45", color: "#79c0ff", border: "1px solid #1f3a5f" }}
                        >
                          {repo.language}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
