function RepoCard({ repo, darkMode }) {
  const card   = darkMode ? "#161b22" : "#ffffff";
  const border = darkMode ? "#30363d" : "#d1d5db";
  const muted  = darkMode ? "#8b949e" : "#57606a";
  const text   = darkMode ? "#e6edf3" : "#1f2328";

  return (
    <div
      className="rounded-xl p-4 flex flex-col gap-2 transition-all duration-200"
      style={{ backgroundColor: card, border: `1px solid ${border}` }}
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = darkMode ? "#8b949e" : "#57606a")}
      onMouseLeave={(e) => (e.currentTarget.style.borderColor = border)}
    >
      {/* Name + external link icon */}
      <div className="flex items-start justify-between gap-2">
        <span className="font-semibold text-sm leading-snug" style={{ color: text }}>
          {repo.name}
        </span>
        <a
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 transition-opacity duration-200 opacity-60 hover:opacity-100 mt-0.5"
          title="Open on GitHub"
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill={muted}>
            <path d="M3.75 2h3.5a.75.75 0 0 1 0 1.5h-3.5a.25.25 0 0 0-.25.25v8.5c0
              .138.112.25.25.25h8.5a.25.25 0 0 0 .25-.25v-3.5a.75.75 0 0 1
              1.5 0v3.5A1.75 1.75 0 0 1 12.25 14h-8.5A1.75 1.75 0 0 1 2
              12.25v-8.5C2 2.784 2.784 2 3.75 2Zm6.854-1h4.146a.25.25 0 0 1
              .25.25v4.146a.25.25 0 0 1-.427.177L13.03 4.03 9.28 7.78a.751.751
              0 0 1-1.042-.018.751.751 0 0 1-.018-1.042l3.75-3.75-1.543-1.543A.25.25
              0 0 1 10.604 1Z"/>
          </svg>
        </a>
      </div>

      {/* Description */}
      <p className="text-xs flex-1 leading-relaxed" style={{ color: muted }}>
        {repo.description || "No description available"}
      </p>

      {/* Stars + language badge */}
      <div className="flex items-center gap-2 text-xs mt-auto flex-wrap" style={{ color: muted }}>
        <span className="flex items-center gap-1">
          <svg width="12" height="12" viewBox="0 0 16 16" fill={muted}>
            <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1
              .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8
              11.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818
              6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z"/>
          </svg>
          {repo.stargazers_count.toLocaleString()}
        </span>
        {repo.language && (
          <>
            <span style={{ color: darkMode ? "#4b5563" : "#d1d5db" }}>•</span>
            <span
              className="px-2 py-0.5 rounded-md text-xs"
              style={{
                backgroundColor: darkMode ? "#21262d" : "#eaeef2",
                border: `1px solid ${darkMode ? "#30363d" : "#d0d7de"}`,
                color: darkMode ? "#e6edf3" : "#1f2328",
              }}
            >
              {repo.language}
            </span>
          </>
        )}
      </div>
    </div>
  );
}

export default RepoCard;
