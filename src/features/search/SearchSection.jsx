import { SEARCH_ENGINES } from "../../constants/defaults";

export default function SearchSection({
  engine,
  onEngineChange,
  query,
  onQueryChange,
  tabEmojis,
}) {
  function submitSearch() {
    const value = query.trim();
    if (!value) return;
    window.open(SEARCH_ENGINES[engine](value), "_blank");
  }

  return (
    <div className="search-container">
      <div className="search-engine-tabs">
        <span className="engine-side-icons" data-side="left">
          {tabEmojis.slice(0, 4).map((emoji, index) => (
            <span key={`left-${index}`} className="tab-emoji">
              {emoji}
            </span>
          ))}
        </span>
        <button
          className={`engine-tab ${engine === "bing" ? "active" : ""}`}
          onClick={() => onEngineChange("bing")}
        >
          Bing
        </button>
        <button
          className={`engine-tab ${engine === "google" ? "active" : ""}`}
          onClick={() => onEngineChange("google")}
        >
          Google
        </button>
        <span className="engine-side-icons" data-side="right">
          {tabEmojis.slice(4, 8).map((emoji, index) => (
            <span key={`right-${index}`} className="tab-emoji">
              {emoji}
            </span>
          ))}
        </span>
      </div>
      <div className="search-wrap">
        <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
        <input
          className="search-input"
          type="text"
          value={query}
          placeholder="输入关键词开始搜索..."
          autoComplete="off"
          spellCheck="false"
          onChange={(event) => onQueryChange(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") submitSearch();
          }}
        />
        <button className="search-btn" onClick={submitSearch}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
