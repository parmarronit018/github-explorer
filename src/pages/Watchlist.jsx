import { useState } from "react";

function Watchlist({ watchlist, onRemove }) {
  const [filterText, setFilterText] = useState("");

  const filteredWatchlist = watchlist.filter((user) =>
    user.login.toLowerCase().includes(filterText.toLowerCase())
  );

  const totalUsers = watchlist.length;
  const avgFollowers =
    totalUsers > 0
      ? Math.round(
          watchlist.reduce((sum, u) => sum + u.followers, 0) / totalUsers
        )
      : 0;

  return (
    <div className="max-w-4xl mx-auto px-4 pb-10">
      <h1 className="text-2xl font-bold text-center mb-6">My Watchlist</h1>

      {totalUsers > 0 && (
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-blue-400">{totalUsers}</p>
            <p className="text-sm text-gray-400">Total Saved Users</p>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-blue-400">{avgFollowers}</p>
            <p className="text-sm text-gray-400">Avg Followers</p>
          </div>
        </div>
      )}

      {totalUsers > 0 && (
        <input
          type="text"
          placeholder="Filter saved users..."
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          className="w-full px-4 py-2 mb-6 rounded-md bg-gray-900 border border-gray-700 text-gray-100 placeholder-gray-500 focus:outline-none focus:border-blue-500"
        />
      )}

      {totalUsers === 0 ? (
        <p className="text-center text-gray-500 mt-10">
          No users saved yet. Search a GitHub user and click Save to add them here.
        </p>
      ) : filteredWatchlist.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">
          No saved users match your filter.
        </p>
      ) : (
        <div className="flex flex-col gap-3">
          {filteredWatchlist.map((user) => (
            <div
              key={user.login}
              className="bg-gray-900 border border-gray-800 rounded-lg p-4 flex items-center gap-4"
            >
              <img
                src={user.avatar_url}
                alt="avatar"
                className="w-14 h-14 rounded-full"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-white">
                  {user.name ? user.name : user.login}
                </h3>
                <p className="text-sm text-gray-400">
                  Followers: {user.followers} | Following: {user.following}
                </p>
              </div>
              <button
                onClick={() => onRemove(user.login)}
                className="px-3 py-1 rounded-md bg-red-900/50 text-red-300 hover:bg-red-900 text-sm font-medium transition-colors"
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