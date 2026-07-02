import { useState, useEffect } from "react";
import Home from "./pages/Home";
import Watchlist from "./pages/Watchlist";

function App() {
  const [activeTab, setActiveTab] = useState("search");

  const [watchlist, setWatchlist] = useState(() => {
    try {
      const saved = localStorage.getItem("gh-watchlist");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("gh-watchlist", JSON.stringify(watchlist));
  }, [watchlist]);

  const addToWatchlist = (user, repos) => {
    if (watchlist.some((u) => u.login === user.login)) return;
    setWatchlist([...watchlist, { ...user, topRepos: repos }]);
  };

  const removeFromWatchlist = (login) => {
    setWatchlist(watchlist.filter((u) => u.login !== login));
  };

  return (
    <div className="min-h-screen w-full" style={{ backgroundColor: "#0d1117", color: "#e6edf3" }}>

      {/* Navbar */}
      <nav
        className="sticky top-0 z-10"
        style={{ borderBottom: "1px solid #21262d", backgroundColor: "#0d1117" }}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-3">

          {/* Logo */}
          <div className="flex items-center gap-2">
            <svg height="24" viewBox="0 0 16 16" width="24" fill="#e6edf3">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38
                0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13
                -.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87
                2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95
                0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21
                2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04
                2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82
                2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48
                0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
              />
            </svg>
            <span className="text-sm font-semibold" style={{ color: "#e6edf3" }}>
              GitHub Explorer
            </span>
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => setActiveTab("search")}
              className="px-4 py-1.5 rounded-md text-sm font-medium transition-all"
              style={
                activeTab === "search"
                  ? { border: "1px solid #6e40c9", color: "#e6edf3", backgroundColor: "transparent" }
                  : { border: "1px solid transparent", color: "#8b949e", backgroundColor: "transparent" }
              }
            >
              Search
            </button>
            <button
              onClick={() => setActiveTab("watchlist")}
              className="px-4 py-1.5 rounded-md text-sm font-medium transition-all"
              style={
                activeTab === "watchlist"
                  ? { backgroundColor: "#6e40c9", color: "#ffffff", border: "1px solid #6e40c9" }
                  : { border: "1px solid transparent", color: "#8b949e", backgroundColor: "transparent" }
              }
            >
              Watchlist ({watchlist.length})
            </button>
          </div>
        </div>
      </nav>

      {/* Pages */}
      <main>
        <div className={activeTab === "search" ? "block" : "hidden"}>
          <Home watchlist={watchlist} onSave={addToWatchlist} />
        </div>
        <div className={activeTab === "watchlist" ? "block" : "hidden"}>
          <Watchlist watchlist={watchlist} onRemove={removeFromWatchlist} />
        </div>
      </main>
    </div>
  );
}

export default App;
