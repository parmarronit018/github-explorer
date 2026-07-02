import { useState } from "react";

function SearchBar({ onSearch, darkMode }) {
  const [username, setUsername] = useState("");

  const card   = darkMode ? "#161b22" : "#ffffff";
  const border = darkMode ? "#30363d" : "#d0d7de";
  const text   = darkMode ? "#e6edf3" : "#1f2328";

  const handleSearch = () => onSearch(username);

  return (
    <div className="flex gap-3 w-full">
      <input
        type="text"
        placeholder="Search a GitHub username, e.g. torvalds"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        className="flex-1 px-4 py-3 rounded-lg text-sm outline-none transition-all"
        style={{ backgroundColor: card, border: `1px solid ${border}`, color: text }}
        onFocus={(e) => (e.target.style.borderColor = "#6e40c9")}
        onBlur={(e)  => (e.target.style.borderColor = border)}
      />
      <button
        onClick={handleSearch}
        className="px-6 py-3 rounded-lg text-sm font-semibold transition-all"
        style={{ backgroundColor: "#6e40c9", color: "#ffffff", border: "none", minWidth: "90px" }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#7c4dca")}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#6e40c9")}
      >
        Search
      </button>
    </div>
  );
}

export default SearchBar;
