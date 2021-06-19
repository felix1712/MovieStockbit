import React, {
  FC,
  ChangeEvent,
  KeyboardEvent,
  FocusEvent,
  CSSProperties
} from "react";
import styles from "./MasterInput.module.css";

export interface IMasterInput {
  type: string;
  label?: string;
  id: string;
  value: string;
  placeholder: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;
  onKeyUp?: (event: KeyboardEvent<HTMLInputElement>) => void;
  onKeyPress?: (event: KeyboardEvent<HTMLInputElement>) => void;
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
  errorText?: string;
  helperText?: string;
  disabled?: boolean | false;
  readonly?: boolean | false;
  maxlength?: number;
  required?: boolean | false;
  tabindex?: number;
  style?: CSSProperties;
  cy?: string;
}

export const MasterInput: FC<IMasterInput> = props => {
  const {
    type,
    label,
    id,
    value,
    placeholder,
    onChange,
    onKeyDown,
    onKeyUp,
    onKeyPress,
    onBlur,
    errorText,
    helperText,
    disabled,
    readonly,
    maxlength,
    required,
    tabindex,
    style,
    cy
  } = props;
  return (
    <div className={styles.input_frame}>
      {label ? (
        <label
          className={`
          ${styles.input_label}
          ${disabled ? styles.input_label_disabled : ""}
          ${required ? styles.input_label_required : ""}
        `}
        >
          {label}
        </label>
      ) : null}
      <input
        type={type}
        className={`
          ${styles.input_content}
          ${
            disabled
              ? styles.input_content_disabled
              : errorText
              ? styles.input_content_error
              : ""
          }
        `}
        onChange={
          !disabled && !readonly && onChange
            ? (event: ChangeEvent<HTMLInputElement>) => onChange(event)
            : undefined
        }
        onKeyDown={
          !disabled && !readonly && onKeyDown
            ? (event: KeyboardEvent<HTMLInputElement>) => onKeyDown(event)
            : undefined
        }
        onKeyUp={
          !disabled && !readonly && onKeyUp
            ? (event: KeyboardEvent<HTMLInputElement>) => onKeyUp(event)
            : undefined
        }
        onKeyPress={
          !disabled && !readonly && onKeyPress
            ? (event: KeyboardEvent<HTMLInputElement>) => onKeyPress(event)
            : undefined
        }
        onBlur={
          !disabled && !readonly && onBlur
            ? (event: FocusEvent<HTMLInputElement>) => onBlur(event)
            : undefined
        }
        id={id}
        name={id}
        placeholder={placeholder}
        maxLength={maxlength}
        required={required}
        tabIndex={tabindex}
        style={style}
        value={value}
        readOnly={(value && !onChange) || readonly}
        autoComplete="off"
        data-cy={cy}
      />

      {helperText && !errorText && (
        <small className={styles.input_helper_text}>{helperText}</small>
      )}
      {errorText && (
        <small className={styles.input_error_text}>{errorText}</small>
      )}
    </div>
  );
};
