export default function CustomModal({
  open,
  title,
  message,
  confirmText,
  cancelText,
  kind,
  onConfirm,
  onCancel,
}) {
  if (!open) return null;

  return (
    <div
      className="custom-modal-overlay show"
      onClick={(event) => {
        if (event.target === event.currentTarget && kind === "confirm") {
          onCancel?.();
        }
      }}
    >
      <div className="custom-modal">
        <div className="custom-modal-title">{title}</div>
        <div className="custom-modal-message">{message}</div>
        <div className="custom-modal-actions">
          {kind === "confirm" ? (
            <>
              <button className="custom-modal-btn cancel" onClick={onCancel}>
                {cancelText}
              </button>
              <button className="custom-modal-btn confirm" onClick={onConfirm}>
                {confirmText}
              </button>
            </>
          ) : (
            <button className="custom-modal-btn alert" onClick={onConfirm}>
              {confirmText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
