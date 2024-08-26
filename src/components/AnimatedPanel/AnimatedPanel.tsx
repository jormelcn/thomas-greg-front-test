import classNames from "classnames";
import { ReactNode } from "react";
import { FaChevronLeft } from "react-icons/fa6";
import style from "./AnimatedPanel.module.css";

export interface IAnimatedPanelProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  side?: "left" | "right";
  doubleExpand?: boolean;
}

export const AnimatedPanel = (props: IAnimatedPanelProps) => {
  return (
    <article
      className={classNames(
        style.root,
        props.open && style.open,
        props.doubleExpand && style.doubleExpand,
        style[props.side ?? "left"]
      )}
    >
      <header>
        {/* <img
          className={style.closeButton}
          src={xIcon.src}
          alt=""
          onClick={props.onClose}
        />*/}
        <FaChevronLeft className={style.closeButton} onClick={props.onClose} />
      </header>
      <main
        onWheel={(evt) => {
          evt.preventDefault();
          evt.stopPropagation();
        }}
      >
        {props.children}
      </main>
    </article>
  );
};
