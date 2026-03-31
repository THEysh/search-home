import { useEffect, useState } from "react";
import { DEFAULT_LINKS } from "../../constants/defaults";
import { getLinks, saveLinks as persistLinks } from "../../services/api/links";

export function useLinksManager({ openAlert, openConfirm }) {
  const [linksOpen, setLinksOpen] = useState(false);
  const [links, setLinks] = useState([]);
  const [linkEditorOpen, setLinkEditorOpen] = useState(false);
  const [linkForm, setLinkForm] = useState({ name: "", url: "", cat: "" });
  const [useEmoji, setUseEmoji] = useState(false);
  const [editingLinkId, setEditingLinkId] = useState(null);
  const [selectedEmoji, setSelectedEmoji] = useState("🔗");
  const [randomEmoji, setRandomEmoji] = useState("");

  useEffect(() => {
    getLinks()
      .then((loadedLinks) => setLinks(Array.isArray(loadedLinks) ? loadedLinks : DEFAULT_LINKS))
      .catch(() => setLinks(DEFAULT_LINKS));
  }, []);

  async function handleSaveLinks(nextLinks) {
    setLinks(nextLinks);
    try {
      await persistLinks(nextLinks);
    } catch (error) {
      console.error("Save links failed:", error);
      openAlert(`保存链接失败：${error.message}`);
    }
  }

  function openLinkEditor(id = null) {
    setEditingLinkId(id);
    if (id) {
      const item = links.find((link) => link.id === id);
      if (!item) return;
      setLinkForm({ name: item.name, url: item.url, cat: item.cat || "" });
      setUseEmoji(Boolean(item.useEmoji));
      setSelectedEmoji(item.icon || "🔗");
      setLinkEditorOpen(true);
      return;
    }

    setLinkForm({ name: "", url: "", cat: "" });
    setUseEmoji(false);
    setSelectedEmoji("🔗");
    setRandomEmoji("");
    setLinkEditorOpen(true);
  }

  function handleLinkSubmit() {
    if (!linkForm.name.trim() || !linkForm.url.trim()) return;

    const normalizedUrl = /^https?:\/\//.test(linkForm.url) ? linkForm.url : `https://${linkForm.url}`;
    const payload = {
      id: editingLinkId ?? Date.now(),
      name: linkForm.name.trim(),
      url: normalizedUrl,
      icon: selectedEmoji,
      useEmoji,
      cat: linkForm.cat.trim(),
    };

    const nextLinks = editingLinkId
      ? links.map((link) => (link.id === editingLinkId ? payload : link))
      : [...links, payload];

    handleSaveLinks(nextLinks);
    setLinkEditorOpen(false);
  }

  function handleDeleteLink(id) {
    openConfirm("确认删除这个快捷链接吗？", () => {
      const nextLinks = links.filter((link) => link.id !== id);
      handleSaveLinks(nextLinks);
    }, "删除快捷链接");
  }

  return {
    linksOpen,
    setLinksOpen,
    links,
    linkEditorOpen,
    setLinkEditorOpen,
    linkForm,
    setLinkForm,
    useEmoji,
    setUseEmoji,
    editingLinkId,
    selectedEmoji,
    setSelectedEmoji,
    randomEmoji,
    setRandomEmoji,
    openLinkEditor,
    handleLinkSubmit,
    handleDeleteLink,
  };
}
