import { useState } from "react";

function SearchBar({ onSearch }) {
  const [username, setUsername] = useState("");

  const handleSearch = () => {
    if (!username.trim()) return;
    onSearch(username);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="flex gap-2 justify-center mb-8">
      <input
        type="text"
        placeholder="Enter GitHub username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        onKeyDown={handleKeyDown}
        className="w-64 px-4 py-2 rounded-md bg-gray-900 border border-gray-700 text-gray-100 placeholder-gray-500 focus:outline-none focus:border-blue-500"
      />
      <button
        onClick={handleSearch}
        className="px-5 py-2 rounded-md bg-blue-600 hover:bg-blue-500 text-white font-medium transition-colors"
      >
        Search
      </button>
    </div>
  );
}

export default SearchBar;