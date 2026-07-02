import { useState } from "react";

function StatCard({ value, label }) {
  return (
    <div
      className="rounded-lg p-4"
      style={{ backgroundColor: "#161b22", border: "1px solid #30363d" }}
    >
      <p className="text-xl font-bold" style={{ color: "#e6edf3" }}>{value}</p>
      <p className="text-xs mt-1" style={{ color: "#8b949e" }}>{label}</p>
    </div>
  );
}

function Watchlist({ watchlist, onRemove }) {
  const [filterText, setFilterText] = useState("");

  // Filter by both login and display name
  const filtered = watchlist.filter((user) => {
    const q = filterText.toLowerCase();
    return (
      user.login.toLowerCase().includes(q) ||
      (user.name && user.name.toLowerCase().includes(q))
    );
  });

  const totalUsers = watchlist.length;

  const avgFollowers =
    totalUsers > 0
      ? Math.round(watchlist.reduce((s, u) => s + u.followers, 0) / totalUsers).toLocaleString()
      : "—";

  const langCounts = {};
  watchlist.forEach((u) =>
    (u.topRepos || []).forEach((r) => {
      if (r.language) langCounts[r.language] = (langCounts[r.language] || 0) + 1;
    })
  );
  const topLang =
    Object.keys(langCounts).length > 0
      ? Object.entries(langCounts).sort((a, b) => b[1] - a[1])[0][0]
      : "—";

  const totalStars = watchlist.reduce(
    (sum, u) => sum + (u.topRepos || []).reduce((s, r) => s + (r.stargazers_count || 0), 0),
    0
  );

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">

      {/* Stats — always visible */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <StatCard value={totalUsers}                                          label="Users saved" />
        <StatCard value={avgFollowers}                                        label="Avg. followers" />
        <StatCard value={topLang}                                             label="Top language" />
        <StatCard value={totalStars > 0 ? totalStars.toLocaleString() : "—"} label="Combined top-repo stars" />
      </div>

      {/* Filter — always visible */}
      <input
        type="text"
        placeholder="Filter saved users by name or username..."
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
        className="w-full px-4 py-3 rounded-lg text-sm outline-none mb-4 transition-all"
        style={{ backgroundColor: "#161b22", border: "1px solid #30363d", color: "#e6edf3" }}
        onFocus={(e) => (e.target.style.borderColor = "#6e40c9")}
        onBlur={(e)  => (e.target.style.borderColor = "#30363d")}
      />

      {/* Empty state */}
      {totalUsers === 0 ? (
        <div
          className="rounded-xl py-16 flex flex-col items-center gap-2"
          style={{ border: "1.5px dashed #30363d" }}
        >
          <p className="font-semibold text-sm" style={{ color: "#e6edf3" }}>
            Your watchlist is empty
          </p>
          <p className="text-xs" style={{ color: "#8b949e" }}>
            Search a GitHub user and hit Save to add them here.
          </p>
        </div>

      ) : filtered.length === 0 ? (
        <div
          className="rounded-xl py-12 flex flex-col items-center gap-2"
          style={{ border: "1.5px dashed #30363d" }}
        >
          <p className="text-sm" style={{ color: "#8b949e" }}>
            No users match "{filterText}"
          </p>
        </div>

      ) : (
        <div className="flex flex-col gap-3">
          {filtered.map((user) => (
            <div
              key={user.login}
              className="rounded-xl px-4 py-3 flex items-center gap-4 transition-all"
              style={{ backgroundColor: "#161b22", border: "1px solid #30363d" }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#6e40c9")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#30363d")}
            >
              <img
                src={user.avatar_url}
                alt={`${user.login} avatar`}
                className="w-10 h-10 rounded-full shrink-0"
                style={{ border: "2px solid #30363d" }}
              />

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-semibold text-sm" style={{ color: "#e6edf3" }}>
                    {user.name || user.login}
                  </span>
                  <span className="text-xs" style={{ color: "#8b949e" }}>
                    @{user.login}
                  </span>
                </div>
                <div className="flex flex-wrap gap-3 mt-0.5 text-xs" style={{ color: "#8b949e" }}>
                  <span>{user.followers.toLocaleString()} followers</span>
                  <span>{user.public_repos} repos</span>
                </div>
              </div>

              <a
                href={user.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs shrink-0 px-2 py-1 rounded transition-colors"
                style={{ color: "#8b949e" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#6e40c9")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#8b949e")}
                title="View on GitHub"
              >
                View
              </a>

              <button
                onClick={() => onRemove(user.login)}
                className="shrink-0 px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                style={{ backgroundColor: "#1f1116", color: "#f85149", border: "1px solid #6e2c3e" }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#2d1015")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#1f1116")}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Watchlist;
