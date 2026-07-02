function UserCard({ user, darkMode }) {
  const card   = darkMode ? "#161b22" : "#ffffff";
  const border = darkMode ? "#30363d" : "#d0d7de";
  const muted  = darkMode ? "#8b949e" : "#57606a";
  const text   = darkMode ? "#e6edf3" : "#1f2328";

  return (
    <div
      className="rounded-xl p-5 flex flex-col items-center text-center"
      style={{ backgroundColor: card, border: `1px solid ${border}` }}
    >
      {/* Avatar with ring */}
      <div className="relative mb-3">
        <img
          src={user.avatar_url}
          alt={`${user.login} avatar`}
          className="w-24 h-24 rounded-full"
          style={{ border: `3px solid ${border}` }}
        />
      </div>

      {/* Name */}
      <h2 className="text-base font-bold" style={{ color: text }}>
        {user.name || user.login}
      </h2>

      {/* Username — blue, clickable */}
      <a
        href={user.html_url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-xs mt-0.5 transition-opacity hover:opacity-75"
        style={{ color: "#58a6ff" }}
      >
        @{user.login}
      </a>

      {/* Bio */}
      <p className="text-xs mt-2 mb-4 leading-relaxed" style={{ color: muted }}>
        {user.bio || "No bio available"}
      </p>

      {/* Stats: Followers | Following | Repos */}
      <div className="w-full grid grid-cols-3 gap-2">
        {[
          { label: "Followers", value: user.followers.toLocaleString() },
          { label: "Following", value: user.following.toLocaleString() },
          { label: "Repos",     value: user.public_repos },
        ].map(({ label, value }) => (
          <div
            key={label}
            className="rounded-lg py-2"
            style={{ backgroundColor: darkMode ? "#0d1117" : "#f6f8fa", border: `1px solid ${border}` }}
          >
            <p className="text-sm font-bold" style={{ color: text }}>{value}</p>
            <p className="text-xs" style={{ color: muted }}>{label}</p>
          </div>
        ))}
      </div>

      {/* Location + GitHub link */}
      <div className="w-full mt-4 flex flex-col gap-1.5 text-xs" style={{ color: muted }}>
        {user.location && (
          <span className="flex items-center gap-1.5 justify-center">
            <svg width="12" height="12" viewBox="0 0 16 16" fill={muted}>
              <path d="m12.596 11.596-3.535 3.536a1.5 1.5 0 0 1-2.122 0l-3.535-3.536a6.5
                6.5 0 1 1 9.192-9.193 6.5 6.5 0 0 1 0 9.193Zm-1.06-8.132v-.001a5
                5 0 1 0-7.072 7.072L8 14.07l3.536-3.534a5 5 0 0 0 0-7.072ZM8
                9a2 2 0 1 1-.001-3.999A2 2 0 0 1 8 9Z"/>
            </svg>
            {user.location}
          </span>
        )}
        <span className="flex items-center gap-1.5 justify-center">
          <svg width="12" height="12" viewBox="0 0 16 16" fill={muted}>
            <path d="m7.775 3.275 1.25-1.25a3.5 3.5 0 1 1 4.95 4.95l-2.5 2.5a3.5 3.5
              0 0 1-4.95 0 .751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018
              2 2 0 0 0 2.83 0l2.5-2.5a2.002 2.002 0 0 0-2.83-2.83l-1.25
              1.25a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042Zm-4.69
              9.64a1.998 1.998 0 0 0 2.83 0l1.25-1.25a.751.751 0 0 1
              1.042.018.751.751 0 0 1 .018 1.042l-1.25 1.25a3.5 3.5 0 1
              1-4.95-4.95l2.5-2.5a3.5 3.5 0 0 1 4.95 0 .751.751 0 0
              1-.018 1.042.751.751 0 0 1-1.042.018 2 2 0 0 0-2.83
              0l-2.5 2.5a1.998 1.998 0 0 0 0 2.83Z"/>
          </svg>
          <a
            href={user.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="truncate max-w-[160px] transition-opacity duration-200 hover:opacity-75"
            style={{ color: "#58a6ff" }}
          >
            {user.html_url}
          </a>
        </span>
      </div>
    </div>
  );
}

export default UserCard;
