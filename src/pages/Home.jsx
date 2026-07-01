import { useState } from "react";
import SearchBar from "../components/SearchBar";
import { fetchUserData, fetchUserRepos } from "../utils/api";
import UserCard from "../components/UserCard";


function Home({ watchlist, onSave }) {
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (username) => {
    const cleanUsername = username.trim().toLowerCase();

    if (!cleanUsername) {
      setError("Please enter a username");
      setUser(null);
      setRepos([]);
      return;
    }

    setLoading(true);
    setError(null);
    setUser(null);
    setRepos([]);

    try {
      const data = await fetchUserData(cleanUsername);
      const repoData = await fetchUserRepos(cleanUsername);
      setUser(data);
      setRepos(repoData);
    } catch (err) {
      console.error("Error fetching user:", err);
      setError("User not found");
    } finally {
      setLoading(false);
    }
  };

  const isSaved = user && watchlist.some((u) => u.login === user.login);

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 px-4 py-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">GitHub Explorer</h1>

        <SearchBar onSearch={handleSearch} />

        {loading && (
          <p className="text-center text-gray-400 mt-6">Loading...</p>
        )}

        {error && (
          <p className="text-center text-red-400 mt-6 bg-red-950/40 border border-red-800 rounded-md py-2">
            {error}
          </p>
        )}

        {user && !loading && (
          <div>
            <UserCard user={user} />
            <div className="flex justify-center mt-4">
              <button
                onClick={() => onSave(user)}
                disabled={isSaved}
                className={`px-5 py-2 rounded-md font-medium transition-colors ${
                  isSaved
                    ? "bg-gray-800 text-gray-500 cursor-not-allowed"
                    : "bg-yellow-600 hover:bg-yellow-500 text-white"
                }`}
              >
                {isSaved ? "Saved" : "Save to Watchlist"}
              </button>
            </div>
          </div>
        )}

        {repos.length > 0 && (
          <div className="mt-10">
            <h2 className="text-xl font-semibold mb-4 text-center">
              Top Repositories
            </h2>
            <div className="flex flex-col gap-3">
              {repos.map((repo) => (
                <div
                  key={repo.id}
                  className="bg-gray-900 border border-gray-800 rounded-lg p-4 hover:border-gray-700 transition-colors"
                >
                  <h3 className="font-semibold text-lg text-white">
                    {repo.name}
                  </h3>
                  <p className="text-sm text-gray-400 mt-1 mb-3">
                    {repo.description ? repo.description : "No description available"}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
                    <span>⭐ {repo.stargazers_count}</span>
                    <span>{repo.language ? repo.language : "N/A"}</span>
                  </div>
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-sm font-medium text-blue-400 hover:text-blue-300"
                  >
                    View Repo →
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}

        {!loading && repos.length === 0 && user && (
          <p className="text-center text-gray-500 mt-6">No repositories found</p>
        )}
      </div>
    </div>
  );
}

export default Home;