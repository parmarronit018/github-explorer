function UserCard({ user }) {
  return (
    <div
      className="rounded-xl p-5 flex flex-col items-center text-center"
      style={{ backgroundColor: "#161b22", border: "1px solid #30363d" }}
    >
      <img
        src={user.avatar_url}
        alt={`${user.login} avatar`}
        className="w-20 h-20 rounded-full mb-3"
        style={{ border: "2px solid #30363d" }}
      />

      <h2 className="text-base font-bold" style={{ color: "#e6edf3" }}>
        {user.name || user.login}
      </h2>

      <a
        href={user.html_url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-xs mt-0.5 transition-colors"
        style={{ color: "#6e40c9" }}
        onMouseEnter={(e) => (e.target.style.color = "#9a6ee0")}
        onMouseLeave={(e) => (e.target.style.color = "#6e40c9")}
      >
        @{user.login}
      </a>

      <p className="text-xs mt-2 mb-4 leading-relaxed" style={{ color: "#8b949e" }}>
        {user.bio || "No bio available"}
      </p>

      {/* Stats row */}
      <div className="w-full grid grid-cols-3 gap-2">
        {[
          { label: "Followers", value: user.followers.toLocaleString() },
          { label: "Following", value: user.following.toLocaleString() },
          { label: "Repos",     value: user.public_repos },
        ].map(({ label, value }) => (
          <div
            key={label}
            className="rounded-md py-2"
            style={{ backgroundColor: "#0d1117", border: "1px solid #21262d" }}
          >
            <p className="text-sm font-bold" style={{ color: "#e6edf3" }}>{value}</p>
            <p className="text-xs" style={{ color: "#8b949e" }}>{label}</p>
          </div>
        ))}
      </div>

      {(user.location || user.company) && (
        <div
          className="flex flex-wrap gap-3 mt-3 text-xs justify-center"
          style={{ color: "#8b949e" }}
        >
          {user.location && <span>{user.location}</span>}
          {user.company  && <span>{user.company}</span>}
        </div>
      )}
    </div>
  );
}

export default UserCard;
