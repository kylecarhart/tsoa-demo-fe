import clsx from "clsx";
import Spinner from "../Spinner/Spinner";
import styles from "./Button.module.css";
import { MouseEventHandler } from "react";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
  icon?: React.ReactNode;
  isLoading?: boolean;
}

export default function Button({
  text,
  icon,
  isLoading,
  onClick,
  disabled,
  ...props
}: Props) {
  const buttonClasses = clsx(styles.button, {
    [styles.disabled]: disabled,
  });

  return (
    <button
      className={buttonClasses}
      onClick={(e) => {
        if (!disabled && !isLoading) {
          onClick(e);
        }
      }}
      {...props}
    >
      {/* <Spinner /> */}
      {isLoading ? <Spinner /> : icon}
      <span>{text}</span>
    </button>
  );
}
