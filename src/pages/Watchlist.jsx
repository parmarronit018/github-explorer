import { useState } from "react";

/* ── Stat card with colored icon ──────────────────────────────── */
function StatCard({ value, label, iconColor, iconBg, icon, darkMode }) {
  const card   = darkMode ? "#161b22" : "#ffffff";
  const border = darkMode ? "#30363d" : "#d0d7de";
  const muted  = darkMode ? "#8b949e" : "#57606a";
  const text   = darkMode ? "#e6edf3" : "#1f2328";

  return (
    <div className="rounded-xl p-4 flex items-center gap-4"
      style={{ backgroundColor: card, border: `1px solid ${border}` }}>
      {/* Icon circle */}
      <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
        style={{ backgroundColor: iconBg }}>
        <svg width="18" height="18" viewBox="0 0 16 16" fill={iconColor}>
          {icon}
        </svg>
      </div>
      <div>
        <p className="text-xl font-bold leading-tight" style={{ color: text }}>{value}</p>
        <p className="text-xs mt-0.5" style={{ color: muted }}>{label}</p>
      </div>
    </div>
  );
}

/* ── Main Watchlist page ───────────────────────────────────────── */
function Watchlist({ watchlist, onRemove, darkMode, onSwitchTab }) {
  const [filterText, setFilterText] = useState("");

  const card   = darkMode ? "#161b22" : "#ffffff";
  const border = darkMode ? "#30363d" : "#d0d7de";
  const muted  = darkMode ? "#8b949e" : "#57606a";
  const text   = darkMode ? "#e6edf3" : "#1f2328";
  const bg     = darkMode ? "#0d1117" : "#f6f8fa";

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

  // SVG icon paths
  const icons = {
    // People (users saved)
    people: <path d="M2 5.5a3.5 3.5 0 1 1 5.898 2.549 5.508 5.508 0 0 1 3.034
      4.084.75.75 0 1 1-1.482.235 4 4 0 0 0-7.9 0 .75.75 0 0
      1-1.482-.236A5.507 5.507 0 0 1 3.102 8.05 3.493 3.493 0 0 1 2
      5.5ZM11 4a3.001 3.001 0 0 1 2.22 5.018 5.01 5.01 0 0 1 2.56
      3.012.749.749 0 0 1-.885 1.184A3.508 3.508 0 0 1 13 13a.75.75
      0 0 1 0-1.5 2 2 0 0 0 .001-4 .75.75 0 0 1 0-1.5A3.001 3.001 0
      0 1 11 4ZM5.5 3.5a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z"/>,
    // People 2 (avg followers)
    people2: <path d="M2 5.5a3.5 3.5 0 1 1 5.898 2.549 5.508 5.508 0 0 1 3.034
      4.084.75.75 0 1 1-1.482.235 4 4 0 0 0-7.9 0 .75.75 0 0
      1-1.482-.236A5.507 5.507 0 0 1 3.102 8.05 3.493 3.493 0 0 1 2
      5.5ZM11 4a3.001 3.001 0 0 1 2.22 5.018 5.01 5.01 0 0 1 2.56
      3.012.749.749 0 0 1-.885 1.184A3.508 3.508 0 0 1 13 13a.75.75
      0 0 1 0-1.5 2 2 0 0 0 .001-4 .75.75 0 0 1 0-1.5A3.001 3.001 0
      0 1 11 4ZM5.5 3.5a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z"/>,
    // Code (top language)
    code: <path d="m11.28 3.22 4.25 4.25a.75.75 0 0 1 0 1.06l-4.25
      4.25a.749.749 0 0 1-1.275-.326.749.749 0 0 1
      .215-.734L13.69 8l-3.72-3.72a.749.749 0 0 1 .326-1.275.749.749
      0 0 1 .734.215Zm-6.56 0a.751.751 0 0 1 1.042.018.751.751 0 0 1
      .018 1.042L2.06 8l3.72 3.72a.749.749 0 0 1-.326 1.275.749.749
      0 0 1-.734-.215L.47 8.53a.75.75 0 0 1 0-1.06Z"/>,
    // Star
    star: <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1
      .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8
      11.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818
      6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z"/>,
    // Add user (empty state)
    addUser: <path d="M2 5.5a3.5 3.5 0 1 1 5.898 2.549 5.508 5.508 0 0 1 3.034
      4.084.75.75 0 1 1-1.482.235 4 4 0 0 0-7.9 0 .75.75 0 0
      1-1.482-.236A5.507 5.507 0 0 1 3.102 8.05 3.493 3.493 0 0 1 2
      5.5ZM5.5 3.5a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8.25.75a.75.75 0
      1 0-1.5 0v1.25H11a.75.75 0 0 0 0 1.5h1.25V8.5a.75.75 0 0 0
      1.5 0V7h1.25a.75.75 0 0 0 0-1.5H13.75Z"/>,
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-6">

      {/* Stats — always visible */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <StatCard
          value={totalUsers}
          label="Users saved"
          iconColor="#c084fc"
          iconBg="rgba(110,64,201,0.2)"
          icon={icons.people}
          darkMode={darkMode}
        />
        <StatCard
          value={avgFollowers}
          label="Avg. followers"
          iconColor="#3fb950"
          iconBg="rgba(63,185,80,0.15)"
          icon={icons.people2}
          darkMode={darkMode}
        />
        <StatCard
          value={topLang}
          label="Top language"
          iconColor="#79c0ff"
          iconBg="rgba(121,192,255,0.15)"
          icon={icons.code}
          darkMode={darkMode}
        />
        <StatCard
          value={totalStars > 0 ? totalStars.toLocaleString() : "—"}
          label="Combined top-repo stars"
          iconColor="#e3b341"
          iconBg="rgba(227,179,65,0.15)"
          icon={icons.star}
          darkMode={darkMode}
        />
      </div>

      {/* Filter input */}
      <div className="relative mb-4">
        <input
          type="text"
          placeholder="Filter saved users by name or username..."
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          className="w-full px-4 py-3 pr-10 rounded-lg text-sm outline-none transition-all"
          style={{ backgroundColor: card, border: `1px solid ${border}`, color: text }}
          onFocus={(e) => (e.target.style.borderColor = "#6e40c9")}
          onBlur={(e)  => (e.target.style.borderColor = border)}
        />
        {/* Search icon inside input */}
        <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
          <svg width="14" height="14" viewBox="0 0 16 16" fill={muted}>
            <path d="M10.68 11.74a6 6 0 0 1-7.922-8.982 6 6 0 0 1 8.982
              7.922l3.04 3.04a.749.749 0 0 1-.326 1.275.749.749 0 0
              1-.734-.215ZM11.5 7a4.499 4.499 0 1 0-8.997 0A4.499 4.499 0 0 0 11.5 7Z"/>
          </svg>
        </span>
      </div>

      {/* User list */}
      {filtered.length > 0 && (
        <div
          className="rounded-xl overflow-hidden mb-6"
          style={{ border: `1px solid ${border}` }}
        >
          {filtered.map((user, idx) => (
            <div
              key={user.login}
              className="flex items-center gap-4 px-4 py-3 transition-all"
              style={{
                backgroundColor: card,
                borderBottom: idx < filtered.length - 1 ? `1px solid ${border}` : "none",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = darkMode ? "#1c2128" : "#f0f3f6")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = card)}
            >
              <img
                src={user.avatar_url}
                alt={`${user.login} avatar`}
                className="w-10 h-10 rounded-full shrink-0"
                style={{ border: `2px solid ${border}` }}
              />

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-semibold text-sm" style={{ color: text }}>
                    {user.name || user.login}
                  </span>
                  <span className="text-xs" style={{ color: "#6e40c9" }}>
                    @{user.login}
                  </span>
                </div>
                <div className="flex items-center gap-4 mt-0.5 text-xs" style={{ color: muted }}>
                  {/* Followers icon */}
                  <span className="flex items-center gap-1">
                    <svg width="11" height="11" viewBox="0 0 16 16" fill={muted}>
                      <path d="M2 5.5a3.5 3.5 0 1 1 5.898 2.549 5.508 5.508 0 0 1 3.034
                        4.084.75.75 0 1 1-1.482.235 4 4 0 0 0-7.9 0 .75.75 0 0
                        1-1.482-.236A5.507 5.507 0 0 1 3.102 8.05 3.493 3.493 0 0 1 2
                        5.5ZM5.5 3.5a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z"/>
                    </svg>
                    {user.followers.toLocaleString()} followers
                  </span>
                  {/* Repos icon */}
                  <span className="flex items-center gap-1">
                    <svg width="11" height="11" viewBox="0 0 16 16" fill={muted}>
                      <path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75
                        0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714
                        1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1
                        1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8Z"/>
                    </svg>
                    {user.public_repos} repos
                  </span>
                </div>
              </div>

              <a
                href={user.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 px-3 py-1 rounded-md text-xs font-medium transition-all"
                style={{ border: `1px solid ${border}`, color: muted }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#6e40c9"; e.currentTarget.style.color = "#6e40c9"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = border; e.currentTarget.style.color = muted; }}
              >
                View
              </a>
              <button
                onClick={() => onRemove(user.login)}
                className="shrink-0 px-3 py-1 rounded-md text-xs font-medium transition-all"
                style={{ border: "1px solid #6e2c3e", color: "#f85149", backgroundColor: "transparent" }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#1f1116")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Empty state — always shown when watchlist is empty */}
      {totalUsers === 0 && (
        <div
          className="rounded-xl py-16 flex flex-col items-center gap-3"
          style={{ border: `1.5px dashed ${border}` }}
        >
          {/* Purple icon circle */}
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center"
            style={{ backgroundColor: "rgba(110,64,201,0.15)", border: "2px solid #6e40c9" }}
          >
            <svg width="22" height="22" viewBox="0 0 16 16" fill="#c084fc">
              <path d="M2 5.5a3.5 3.5 0 1 1 5.898 2.549 5.508 5.508 0 0 1 3.034
                4.084.75.75 0 1 1-1.482.235 4 4 0 0 0-7.9 0 .75.75 0 0
                1-1.482-.236A5.507 5.507 0 0 1 3.102 8.05 3.493 3.493 0 0 1 2
                5.5ZM5.5 3.5a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8.25.75a.75.75 0
                1 0-1.5 0v1.25H11a.75.75 0 0 0 0 1.5h1.25V8.5a.75.75 0 0 0
                1.5 0V7h1.25a.75.75 0 0 0 0-1.5H13.75Z"/>
            </svg>
          </div>
          <p className="font-semibold text-sm" style={{ color: text }}>
            Your watchlist is empty
          </p>
          <p className="text-xs" style={{ color: muted }}>
            Search for GitHub users and save them to see them here.
          </p>
          {/* Search users button */}
          <button
            onClick={onSwitchTab}
            className="mt-2 px-5 py-2 rounded-lg text-sm font-medium transition-all"
            style={{ backgroundColor: "#6e40c9", color: "#ffffff", border: "none" }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#7c4dca")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#6e40c9")}
          >
            Search Users
          </button>
        </div>
      )}

      {/* No filter match */}
      {totalUsers > 0 && filtered.length === 0 && (
        <div
          className="rounded-xl py-12 flex flex-col items-center gap-2"
          style={{ border: `1.5px dashed ${border}` }}
        >
          <p className="text-sm" style={{ color: muted }}>
            No users match "{filterText}"
          </p>
        </div>
      )}
    </div>
  );
}

export default Watchlist;
