import { useState } from "react";
import { DEFAULT_MODAL_STATE } from "../constants/defaults";

export function useModalState() {
  const [modalState, setModalState] = useState(DEFAULT_MODAL_STATE);

  function closeModal() {
    setModalState(DEFAULT_MODAL_STATE);
  }

  function openAlert(message, title = "提示") {
    setModalState({
      open: true,
      title,
      message,
      confirmText: "好的",
      cancelText: "取消",
      kind: "alert",
      onConfirm: closeModal,
      onCancel: closeModal,
    });
  }

  function openConfirm(message, onConfirm, title = "确认操作") {
    setModalState({
      open: true,
      title,
      message,
      confirmText: "确认",
      cancelText: "取消",
      kind: "confirm",
      onConfirm: () => {
        closeModal();
        onConfirm?.();
      },
      onCancel: closeModal,
    });
  }

  return {
    modalState,
    closeModal,
    openAlert,
    openConfirm,
  };
}
