import React from "react";
import styles from "/styles/popup/ErrMessage.module.css";

const ErrMessage = (props) => {
  return (
    <div className={styles.errMessageContainer}>
      <p className={styles.errMessage}>{props.errMessage}</p>
    </div>
  );
};

export default ErrMessage;
