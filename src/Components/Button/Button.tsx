import React, { FC, MouseEvent, ReactNode } from "react";
import styles from "./Button.module.css";

export interface IButton {
  type?: string;
  variant?: string;
  disabled?: boolean | false;
  block?: boolean | false;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  tabindex?: number;
  children?: ReactNode;
}

export const Button: FC<IButton> = props => {
  const { type, variant, disabled, block, onClick, tabindex, children } = props;
  return (
    <>
      <button
        className={`
          ${styles.button_content}
          ${
            type === "normal"
              ? styles.normal_button
              : type === "rounded"
              ? styles.rounded_button
              : styles.normal_button
          }
          ${
            variant === "blue"
              ? styles.blue_button
              : variant === "orange"
              ? styles.orange_button
              : styles.blue_button
          }
          ${disabled ? styles.disabled_button : ""}
          ${block ? styles.block_button : ""}
        `}
        onClick={
          !disabled && onClick
            ? (event: MouseEvent<HTMLButtonElement>) => onClick(event)
            : undefined
        }
        tabIndex={tabindex}
        disabled={disabled}
      >
        {children || "Submit"}
      </button>
    </>
  );
};
