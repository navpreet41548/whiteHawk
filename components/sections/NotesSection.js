import Image from "next/image";
import Link from "next/link";
import React from "react";
import styles from "../../styles/NotesSection.module.css";

const NotesSection = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>NOTES</h2>
      <div className={styles.mainContainer}>
        <Image
          src="/static/images/notes/notes1.jpg"
          width="800"
          height="800"
          alt="Notes Image"
          className={styles.bgImage}
        />
        <div className={styles.layer}>
          <h1 className={styles.layerContent}>
            EXPLORE THE NEW WAY OF LEARNING WITH OUR
            <span className={styles.color}> NOTES</span>,
            <span className={styles.color}> EDUCATIONAL MEMES</span>,
            <span className={styles.color}> FORMULA </span>
            <span className={styles.color}>CHEAT SHEETS </span> etc.
          </h1>

          <Link
            href={"/shop/products/allProducts"}
            className={styles.layerButton}
          >
            SHOP NOW
          </Link>
        </div>
      </div>
      <Image
        src="/static/images/notes/notes1.jpg"
        width="800"
        height="800"
        alt="Notes Image"
        className={`${styles.notesImage} ${styles.notesImage1}`}
        loading="lazy"
      />
      <Image
        src="/static/images/notes/notes2.jpg"
        width="800"
        height="800"
        alt="Notes Image"
        className={`${styles.notesImage} ${styles.notesImage2}`}
        loading="lazy"
      />
      <Image
        src="/static/images/notes/notes3.jpg"
        width="800"
        height="800"
        alt="Notes Image"
        className={`${styles.notesImage} ${styles.notesImage3}`}
        loading="lazy"
      />
    </div>
  );
};

export default NotesSection;
