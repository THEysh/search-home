import { useEffect, useRef } from "react";

export default function EmojiPicker({
  categories,
  activeCategory,
  selectedEmoji,
  onCategoryChange,
  onEmojiSelect,
}) {
  const emojis = categories[activeCategory] || [];
  const selectedEmojiRef = useRef(null);

  useEffect(() => {
    if (!selectedEmoji) return;
    if (emojis.includes(selectedEmoji)) return;

    const targetCategory = Object.keys(categories).find((category) =>
      (categories[category] || []).includes(selectedEmoji),
    );

    if (targetCategory && targetCategory !== activeCategory) {
      onCategoryChange(targetCategory);
    }
  }, [activeCategory, categories, emojis, onCategoryChange, selectedEmoji]);

  useEffect(() => {
    selectedEmojiRef.current?.scrollIntoView({
      block: "nearest",
      inline: "nearest",
      behavior: "auto",
    });
  }, [activeCategory, selectedEmoji]);

  return (
    <div className="emoji-picker-panel">
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
            ref={selectedEmoji === emoji ? selectedEmojiRef : null}
            className={`emoji-btn ${selectedEmoji === emoji ? "selected" : ""}`}
            type="button"
            title={emoji}
            onClick={() => onEmojiSelect(emoji)}
          >
            {emoji}
          </button>
        ))}
      </div>
    </div>
  );
}
