import { useState } from "react";

function SearchBar({ onSearch, darkMode }) {
  const [username, setUsername] = useState("");

  const card   = darkMode ? "#161b22" : "#ffffff";
  const border = darkMode ? "#30363d" : "#d1d5db";
  const text   = darkMode ? "#e6edf3" : "#1f2328";
  const muted  = darkMode ? "#8b949e" : "#57606a";

  const handleSearch = () => onSearch(username);

  return (
    <div className="flex gap-3 w-full">
      {/* Input with search icon inside */}
      <div className="relative flex-1">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
          <svg width="15" height="15" viewBox="0 0 16 16" fill={muted}>
            <path d="M10.68 11.74a6 6 0 0 1-7.922-8.982 6 6 0 0 1 8.982
              7.922l3.04 3.04a.749.749 0 0 1-.326 1.275.749.749 0 0
              1-.734-.215ZM11.5 7a4.499 4.499 0 1 0-8.997 0A4.499 4.499 0 0 0 11.5 7Z"/>
          </svg>
        </span>
        <input
          type="text"
          placeholder="Search a GitHub username..."
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          className="w-full pl-9 pr-4 py-3 rounded-lg text-sm outline-none transition-all"
          style={{ backgroundColor: card, border: `1px solid ${border}`, color: text }}
          onFocus={(e) => (e.target.style.borderColor = darkMode ? "#8b949e" : "#57606a")}
          onBlur={(e)  => (e.target.style.borderColor = border)}
        />
      </div>

      {/* Search button — bordered, no fill */}
      <button
        onClick={handleSearch}
        className="px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-200 active:scale-95"
        style={{
          border: `1px solid ${darkMode ? "#4b5563" : "#d1d5db"}`,
          color: darkMode ? "#ffffff" : "#000000",
          backgroundColor: "transparent",
          minWidth: "90px",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = darkMode ? "#1f2937" : "#f3f4f6";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "transparent";
        }}
      >
        Search
      </button>
    </div>
  );
}

export default SearchBar;
