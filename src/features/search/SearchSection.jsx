import { SEARCH_ENGINES } from "../../constants/defaults";

export default function SearchSection({
  engine,
  onEngineChange,
  query,
  onQueryChange,
  tabEmojis,
  emojiLibraryLoaded,
}) {
  function submitSearch() {
    const value = query.trim();
    if (!value) return;
    window.open(SEARCH_ENGINES[engine](value), "_blank");
  }

  return (
    <div className="search-container">
      <div className="search-engine-tabs">
        {emojiLibraryLoaded ? (
          <span className="engine-side-icons" data-side="left">
            {tabEmojis.slice(0, 4).map((emoji, index) => (
              <span key={`left-${index}`} className="tab-emoji">
                {emoji}
              </span>
            ))}
          </span>
        ) : null}
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
        {emojiLibraryLoaded ? (
          <span className="engine-side-icons" data-side="right">
            {tabEmojis.slice(4, 8).map((emoji, index) => (
              <span key={`right-${index}`} className="tab-emoji">
                {emoji}
              </span>
            ))}
          </span>
        ) : null}
      </div>
      <div className="search-wrap">
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
        <button className="search-btn" type="button" aria-label="Search" onClick={submitSearch}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
        </button>
      </div>
    </div>
  );
}
