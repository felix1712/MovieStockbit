import React from "react";
import styles from "./Popup.module.css";

export const Popup = (props: any) => {
  const { closePopup, title, content, contentImage } = props;
  return (
    <div>
      <div data-cy="popup" className={styles["popup-wrapper"]}>
        <div
          className={`${styles.popup_content} ${
            contentImage ? styles.popup_content_image : ""
          }`}
          data-cy="pop-up-frame"
        >
          <div className={styles["popup_header_container"]}>
            <div
              data-cy="close_modal"
              className={`close_button ${
                contentImage ? styles.close_button_image : ""
              }`}
              onClick={closePopup}
            ></div>
            {title && (
              <div className={styles["header_content"]}>
                {/* <h6 className={styles["popup-title"]}>{title}</h6> */}
              </div>
            )}
          </div>
          <div data-cy="popup_message" className={styles["popup-message"]}>
            {!contentImage ? content : <img src={contentImage} alt="" />}
          </div>
        </div>
      </div>
    </div>
  );
};
