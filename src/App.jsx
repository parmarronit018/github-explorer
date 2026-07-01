import { useState } from "react";
import Home from "./pages/Home";
import Watchlist from "./pages/Watchlist";

function App() {
  const [activeTab, setActiveTab] = useState("search");
  const [watchlist, setWatchlist] = useState([]);

  const addToWatchlist = (user) => {
    const alreadySaved = watchlist.some((u) => u.login === user.login);
    if (alreadySaved) return;
    setWatchlist([...watchlist, user]);
  };

  const removeFromWatchlist = (login) => {
    setWatchlist(watchlist.filter((u) => u.login !== login));
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <nav className="flex justify-center gap-4 border-b border-gray-800 py-4 mb-6">
        <button
          onClick={() => setActiveTab("search")}
          className={`px-4 py-2 rounded-md font-medium transition-colors ${
            activeTab === "search"
              ? "bg-blue-600 text-white"
              : "bg-gray-900 text-gray-400 hover:text-gray-200"
          }`}
        >
          Search
        </button>
        <button
          onClick={() => setActiveTab("watchlist")}
          className={`px-4 py-2 rounded-md font-medium transition-colors ${
            activeTab === "watchlist"
              ? "bg-blue-600 text-white"
              : "bg-gray-900 text-gray-400 hover:text-gray-200"
          }`}
        >
          My Watchlist ({watchlist.length})
        </button>
      </nav>

      {activeTab === "search" ? (
        <Home
          watchlist={watchlist}
          onSave={addToWatchlist}
        />
      ) : (
        <Watchlist
          watchlist={watchlist}
          onRemove={removeFromWatchlist}
        />
      )}
    </div>
  );
}

export default App;