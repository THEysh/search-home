export function setEmojiFavicon(emoji) {
  let link = document.querySelector("link[rel~='icon']");
  if (!link) {
    link = document.createElement("link");
    link.rel = "icon";
    document.head.appendChild(link);
  }

  const canvas = document.createElement("canvas");
  canvas.width = 32;
  canvas.height = 32;
  const context = canvas.getContext("2d");
  context.font = "28px serif";
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillText(emoji, 16, 16);
  link.href = canvas.toDataURL();
}
