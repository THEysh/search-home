export default function EmojiPicker({
  categories,
  activeCategory,
  selectedEmoji,
  onCategoryChange,
  onEmojiSelect,
}) {
  const emojis = categories[activeCategory] || [];

  return (
    <>
      <div className="emoji-cats">
        {Object.keys(categories).map((category) => (
          <button
            key={category}
            className={`emoji-cat-btn ${activeCategory === category ? "active" : ""}`}
            type="button"
            onClick={() => onCategoryChange(category)}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="emoji-grid">
        {emojis.map((emoji) => (
          <button
            key={emoji}
            className={`emoji-btn ${selectedEmoji === emoji ? "selected" : ""}`}
            type="button"
            title={emoji}
            onClick={() => onEmojiSelect(emoji)}
          >
            {emoji}
          </button>
        ))}
      </div>
    </>
  );
}
