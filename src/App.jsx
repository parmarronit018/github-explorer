import { useState, useEffect } from "react";
import Home from "./pages/Home";
import Watchlist from "./pages/Watchlist";

function App() {
  const [activeTab, setActiveTab] = useState("search");
  const [darkMode, setDarkMode] = useState(true);

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

  const bg   = darkMode ? "#0d1117" : "#f6f8fa";
  const text = darkMode ? "#e6edf3" : "#1f2328";

  return (
    <div style={{ backgroundColor: bg, color: text, minHeight: "100vh", display: "flex", flexDirection: "column" }}>

      {/* Navbar */}
      <nav style={{ borderBottom: `1px solid ${darkMode ? "#21262d" : "#d0d7de"}`, backgroundColor: bg }}
        className="sticky top-0 z-10">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-3">

          {/* Logo */}
          <div className="flex items-center gap-2">
            <svg height="24" viewBox="0 0 16 16" width="24" fill={text}>
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38
                0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13
                -.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66
                .07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15
                -.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0
                1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82
                1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01
                1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
            </svg>
            <span className="text-sm font-semibold">GitHub Explorer</span>
          </div>

          {/* Right: tabs + toggle */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab("search")}
              className="px-4 py-1.5 rounded-md text-sm font-medium transition-all duration-200"
              style={
                activeTab === "search"
                  ? {
                      border: `1px solid ${darkMode ? "#ffffff" : "#000000"}`,
                      color: darkMode ? "#ffffff" : "#000000",
                      backgroundColor: "transparent",
                    }
                  : {
                      border: "1px solid transparent",
                      color: darkMode ? "#8b949e" : "#57606a",
                      backgroundColor: "transparent",
                    }
              }
            >
              Search
            </button>

            <button
              onClick={() => setActiveTab("watchlist")}
              className="px-4 py-1.5 rounded-md text-sm font-medium transition-all duration-200"
              style={
                activeTab === "watchlist"
                  ? {
                      backgroundColor: darkMode ? "#ffffff" : "#000000",
                      color: darkMode ? "#000000" : "#ffffff",
                      border: `1px solid ${darkMode ? "#ffffff" : "#000000"}`,
                    }
                  : {
                      border: "1px solid transparent",
                      color: darkMode ? "#8b949e" : "#57606a",
                      backgroundColor: "transparent",
                    }
              }
            >
              Watchlist ({watchlist.length})
            </button>

            {/* Dark/light toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="w-9 h-9 rounded-md flex items-center justify-center transition-all duration-200"
              style={{
                border: `1px solid ${darkMode ? "#4b5563" : "#d1d5db"}`,
              }}
              title="Toggle theme"
            >
              {darkMode ? (
                /* Sun icon — shown in dark mode, white */
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="4"/>
                  <line x1="12" y1="2" x2="12" y2="6"/>
                  <line x1="12" y1="18" x2="12" y2="22"/>
                  <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"/>
                  <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"/>
                  <line x1="2" y1="12" x2="6" y2="12"/>
                  <line x1="18" y1="12" x2="22" y2="12"/>
                  <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"/>
                  <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"/>
                </svg>
              ) : (
                /* Moon icon — shown in light mode, black */
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                </svg>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Pages */}
      <main style={{ flex: 1 }}>
        <div className={activeTab === "search" ? "block" : "hidden"}>
          <Home
            watchlist={watchlist}
            onSave={addToWatchlist}
            onRemove={removeFromWatchlist}
            darkMode={darkMode}
            onSwitchTab={() => setActiveTab("watchlist")}
          />
        </div>
        <div className={activeTab === "watchlist" ? "block" : "hidden"}>
          <Watchlist
            watchlist={watchlist}
            onRemove={removeFromWatchlist}
            darkMode={darkMode}
            onSwitchTab={() => setActiveTab("search")}
          />
        </div>
      </main>

      {/* Footer */}
      <footer
        className="text-center py-4 text-xs mt-8"
        style={{
          borderTop: `1px solid ${darkMode ? "#21262d" : "#d0d7de"}`,
          color: darkMode ? "#8b949e" : "#57606a",
        }}
      >
        Data from GitHub API &nbsp;•&nbsp; Built with React &amp; Tailwind CSS
      </footer>
    </div>
  );
}

export default App;
