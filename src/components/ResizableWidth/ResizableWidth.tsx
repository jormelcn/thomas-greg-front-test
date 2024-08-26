import { CSSProperties, ReactNode, useState } from "react";
import { Draggable } from "../Draggable";

export interface IResizableProps {
  children: ReactNode;
  width: number;
  onWidthChange: (width: number) => void;
  onChangeStop?: () => void;
  style?: CSSProperties;
  className?: string;
  disabled?: boolean;
}

export const ResizableWidth = (props: IResizableProps) => {

  const [referenceWidth, setReferenceWidth] = useState(props.width);

  const onMove = (position: { x: number }) => {
    props.onWidthChange(Math.max(0, referenceWidth + position.x));
  };

  const onDrop = () => {
    setReferenceWidth(props.width);
    if (props.onChangeStop) props.onChangeStop();
  };

  return (
    <div
      className={props.className}
      style={{
        ...props.style,
        width: props.width + "px",
        minWidth: props.width + "px",
        maxWidth: props.width + "px",
        position: "relative",
      }}>
      {props.children}
      <div
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          height: "100%",
          width: "0.5rem",
          zIndex: 1,
        }}
      >
        <Draggable
          position={{ x: 0, y: 0 }}
          onMove={onMove}
          onDrop={onDrop}
          style={{ height: "100%", cursor: props.disabled ? "normal" : "col-resize" }}
          disabled={props.disabled}
        >
          <div
            style={{
              width: "0.5rem",
              height: "100%",
              zIndex: 1,

            }}
          />
        </Draggable>
      </div>
    </div>
  );
}