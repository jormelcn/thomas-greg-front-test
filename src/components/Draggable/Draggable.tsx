import {
  CSSProperties,
  MouseEventHandler,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

export interface IDragggableProps {
  children: ReactNode;
  position: { x: number; y: number };
  onMove?: (position: { x: number; y: number }) => void;
  onDrop?: (position: { x: number; y: number }) => void;
  style?: CSSProperties;
  disabled?: boolean;
}

export const Draggable = ({
  children,
  position,
  onMove,
  onDrop,
  style,
  disabled,
}: IDragggableProps) => {
  const [dragging, setDragging] = useState(false);
  const [relativePosition, setRelativePosition] = useState({ x: 0, y: 0 });

  const rootRef = useRef(null as HTMLDivElement | null);

  const onMouseUp = useCallback(
    (evt: MouseEvent) => {
      setDragging(false);
      if (onDrop)
        onDrop({
          x: evt.pageX - relativePosition.x,
          y: evt.pageY - relativePosition.y,
        });
      evt.stopPropagation();
      evt.preventDefault();
    },
    [onDrop, relativePosition]
  );

  const onMouseDown: MouseEventHandler<HTMLDivElement> = useCallback((evt) => {
    if (evt.button !== 0) return;
    setRelativePosition({
      x: evt.pageX - (rootRef.current?.offsetLeft ?? 0),
      y: evt.pageY - (rootRef.current?.offsetTop ?? 0),
    });
    setDragging(true);
    evt.stopPropagation();
    evt.preventDefault();
  }, []);

  const onMouseMove = useCallback(
    (evt: MouseEvent) => {
      if (!dragging || disabled) return;
      if (onMove)
        onMove({
          x: evt.pageX - relativePosition.x,
          y: evt.pageY - relativePosition.y,
        });
      evt.stopPropagation();
      evt.preventDefault();
    },
    [onMove, relativePosition, disabled, dragging]
  );

  useEffect(() => {
    if (dragging) {
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);

      return () => {
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
      };
    }
  }, [dragging, onMouseUp, onMouseMove]);

  return (
    <div
      ref={rootRef}
      onMouseDown={onMouseDown}
      style={{
        ...style,
        position: "absolute",
        left: position.x + "px",
        top: position.y + "px",
      }}
    >
      {children}
    </div>
  );
};
