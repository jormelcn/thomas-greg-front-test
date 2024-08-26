import classNames from "classnames";
import { MouseEventHandler, ReactNode } from "react";

export interface IButtonProps {
  loading: boolean;
  disabled?: boolean;
  variant: "contained" | "text";
  className?: string;
  children?: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export const Button = (props: IButtonProps) => {
  const { children, loading, variant, disabled } = props;
  return (
    <button
      onClick={props.onClick}
      className={classNames(
        "btn",
        props.className,
        loading && "loading",
        variant
      )}
      disabled={disabled || loading}
    >
      {children}
    </button>
  );
};
