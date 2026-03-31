import { deleteRequest, getJson, postJson, uploadFile } from "./client";

export function getBackground() {
  return getJson("/api/background");
}

export function saveBackground(payload) {
  return postJson("/api/background", payload);
}

export function getImages() {
  return getJson("/api/images");
}

export function uploadBackground(file) {
  return uploadFile("/api/upload", file);
}

export function deleteBackground(filename) {
  return deleteRequest(`/api/upload/${filename}`);
}
