import { useState } from "react";

function SearchBar({ onSearch }) {
  const [username, setUsername] = useState("");

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
        style={{
          backgroundColor: "#161b22",
          border: "1px solid #30363d",
          color: "#e6edf3",
        }}
        onFocus={(e) => (e.target.style.borderColor = "#6e40c9")}
        onBlur={(e) => (e.target.style.borderColor = "#30363d")}
      />
      <button
        onClick={handleSearch}
        className="px-5 py-3 rounded-lg text-sm font-semibold transition-all"
        style={{ backgroundColor: "#6e40c9", color: "#ffffff", border: "none" }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#7c4dca")}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#6e40c9")}
      >
        Search
      </button>
    </div>
  );
}

export default SearchBar;
