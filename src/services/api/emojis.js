import { getJson } from "./client";

export function getEmojis() {
  return getJson("/api/emojis");
}
