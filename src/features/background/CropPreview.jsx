import { useEffect, useRef } from "react";

export default function CropPreview({ imageRef, positionX, positionY, onPositionChange, onPositionCommit }) {
  const boxRef = useRef(null);
  const dragRef = useRef({ active: false, startX: 0, startY: 0, startL: 0, startT: 0 });

  useEffect(() => {
    const element = imageRef.current;
    const box = boxRef.current;
    if (!element || !box) return;

    function getCoverViewportRect() {
      const rect = element.getBoundingClientRect();
      const viewAspect = window.innerWidth / window.innerHeight;
      const imgAspect = rect.width / rect.height;

      if (viewAspect > imgAspect) {
        return { rect, width: rect.width, height: rect.width / viewAspect };
      }

      return { rect, width: rect.height * viewAspect, height: rect.height };
    }

    function syncBoxToPosition() {
      const { rect, width, height } = getCoverViewportRect();
      const overflowX = Math.max(0, rect.width - width);
      const overflowY = Math.max(0, rect.height - height);
      const left = overflowX === 0 ? 0 : (positionX / 100) * overflowX;
      const top = overflowY === 0 ? 0 : (positionY / 100) * overflowY;

      box.style.width = `${width}px`;
      box.style.height = `${height}px`;
      box.style.left = `${left}px`;
      box.style.top = `${top}px`;
    }

    function handleMouseMove(event) {
      if (!dragRef.current.active) return;
      const { rect, width, height } = getCoverViewportRect();
      const nextLeft = Math.max(
        0,
        Math.min(dragRef.current.startL + event.clientX - dragRef.current.startX, rect.width - box.offsetWidth),
      );
      const nextTop = Math.max(
        0,
        Math.min(dragRef.current.startT + event.clientY - dragRef.current.startY, rect.height - box.offsetHeight),
      );

      box.style.left = `${nextLeft}px`;
      box.style.top = `${nextTop}px`;

      const overflowX = Math.max(0, rect.width - width);
      const overflowY = Math.max(0, rect.height - height);
      onPositionChange({
        positionX: overflowX === 0 ? 50 : (nextLeft / overflowX) * 100,
        positionY: overflowY === 0 ? 50 : (nextTop / overflowY) * 100,
      });
    }

    function handleMouseUp() {
      if (!dragRef.current.active) return;
      dragRef.current.active = false;
      onPositionCommit?.();
    }

    syncBoxToPosition();
    window.addEventListener("resize", syncBoxToPosition);
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("resize", syncBoxToPosition);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [imageRef, onPositionChange, onPositionCommit, positionX, positionY]);

  return (
    <>
      <div className="crop-overlay" />
      <div className="bg-crop-instructions">
        拖动框选区域来调整背景显示位置，框的大小就是当前窗口实际可见范围。
      </div>
      <div
        ref={boxRef}
        className="bg-crop-box"
        onMouseDown={(event) => {
          const box = boxRef.current;
          if (!box) return;
          dragRef.current = {
            active: true,
            startX: event.clientX,
            startY: event.clientY,
            startL: box.offsetLeft,
            startT: box.offsetTop,
          };
          event.preventDefault();
          event.stopPropagation();
        }}
      />
    </>
  );
}
