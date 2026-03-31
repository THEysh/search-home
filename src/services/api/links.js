import { getJson, postJson } from "./client";

export function getLinks() {
  return getJson("/api/links");
}

export function saveLinks(links) {
  return postJson("/api/links", links);
}
