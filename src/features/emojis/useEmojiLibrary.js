import { useEffect, useMemo, useState } from "react";
import { DEFAULT_TAB_EMOJIS, EMOJI_GROUP_NAMES } from "../../constants/defaults";
import { getEmojis } from "../../services/api/emojis";

const ALL_CATEGORY = "全部";

function normalizeEmojiCategories(payload) {
  const categories = { [ALL_CATEGORY]: [] };
  Object.entries(payload || {}).forEach(([groupName, emojis]) => {
    const label = EMOJI_GROUP_NAMES[groupName] || groupName;
    categories[label] = emojis;
    categories[ALL_CATEGORY].push(...emojis);
  });
  categories[ALL_CATEGORY] = [...new Set(categories[ALL_CATEGORY])];
  return categories;
}

export function useEmojiLibrary() {
  const [emojiCategories, setEmojiCategories] = useState({ [ALL_CATEGORY]: [] });
  const [activeCategory, setActiveCategory] = useState(ALL_CATEGORY);
  const [tabEmojis, setTabEmojis] = useState(DEFAULT_TAB_EMOJIS);
  const [emojiLibraryLoaded, setEmojiLibraryLoaded] = useState(false);

  useEffect(() => {
    getEmojis()
      .then((payload) => {
        const categories = normalizeEmojiCategories(payload);
        setEmojiCategories(categories);
        if (categories[ALL_CATEGORY].length) {
          setTabEmojis(categories[ALL_CATEGORY].slice(0, 8));
        }
      })
      .catch(() => {
        setEmojiCategories({ [ALL_CATEGORY]: DEFAULT_TAB_EMOJIS });
      })
      .finally(() => {
        setEmojiLibraryLoaded(true);
      });
  }, []);

  const allEmojis = useMemo(
    () => emojiCategories[ALL_CATEGORY] || DEFAULT_TAB_EMOJIS,
    [emojiCategories],
  );

  function randomEmoji(fallback = "🎉") {
    return allEmojis[Math.floor(Math.random() * allEmojis.length)] || fallback;
  }

  function randomizeTabEmojis() {
    setTabEmojis(Array.from({ length: 8 }, () => randomEmoji("✨")));
  }

  return {
    emojiCategories,
    activeCategory,
    setActiveCategory,
    tabEmojis,
    emojiLibraryLoaded,
    setTabEmojis,
    allEmojis,
    randomEmoji,
    randomizeTabEmojis,
  };
}
