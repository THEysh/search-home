export const SEARCH_ENGINES = {
  google: (query) => `https://www.google.com/search?q=${encodeURIComponent(query)}`,
  bing: (query) => `https://www.bing.com/search?q=${encodeURIComponent(query)}`,
};

export const DEFAULT_LINKS = [
  { id: 1, name: "GitHub", url: "https://github.com", icon: "\u{1F419}", cat: "开发", useEmoji: true },
  { id: 2, name: "YouTube", url: "https://youtube.com", icon: "\u{1F4FA}", cat: "视频", useEmoji: true },
  { id: 3, name: "Twitter/X", url: "https://x.com", icon: "\u{1F4AC}", cat: "社交", useEmoji: true },
  { id: 4, name: "Gmail", url: "https://mail.google.com", icon: "\u{1F4EE}", cat: "邮箱", useEmoji: true },
  { id: 5, name: "Wikipedia", url: "https://www.wikipedia.org", icon: "\u{1F4DA}", cat: "知识", useEmoji: true },
  { id: 6, name: "Figma", url: "https://figma.com", icon: "\u{1F3A8}", cat: "设计", useEmoji: true },
];

export const DEFAULT_MODAL_STATE = {
  open: false,
  title: "",
  message: "",
  confirmText: "确定",
  cancelText: "取消",
  kind: "alert",
  onConfirm: null,
  onCancel: null,
};

export const DEFAULT_TAB_EMOJIS = [
  "\u{1F50D}",
  "\u2728",
  "\u{1F680}",
  "\u{1F310}",
  "\u{1F9E0}",
  "\u{1F3A8}",
  "\u{1F4DA}",
  "\u{1F4A1}",
];

export const EMOJI_GROUP_NAMES = {
  "Smileys & Emotion": "表情",
  "People & Body": "人物",
  "Animals & Nature": "自然",
  "Food & Drink": "食物",
  "Travel & Places": "地点",
  Activities: "活动",
  Objects: "物品",
  Symbols: "符号",
  Flags: "旗帜",
};
