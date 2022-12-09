import Image from "next/image";
import React from "react";
import styles from "/styles/shop/EmptyMessage.module.css";
const EmptyMessage = (props) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>{props.message}</h1>
      <Image
        className={styles.image}
        src={`/static/images/vector/${props.imageName}`}
        width={400}
        height={300}
        alt="Empty Cart Image"
      />
    </div>
  );
};

export default EmptyMessage;
