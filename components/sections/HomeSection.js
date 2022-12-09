import Head from "next/head";
import Image from "next/image";
import React from "react";
import styles from "../../styles/HomeSection.module.css";

const HomeSection = () => {
  return (
    <div className={styles.homeContainer}>
      <Head>
        <title>WhiteHawk</title>
        <meta name="description" content="WhiteHawk Main Page || Home Page" />
        <link rel="icon" href="/public/images/logo/logo.jpg" />
      </Head>

      <div className={styles.left}>
        <h1 className={styles.mainHeading}>
          EXPERIENCE DIFFERENT WAY OF{" "}
          <span className={styles.color}>LEARNING</span>
        </h1>
        <h4 className={styles.subHeading}>
          Cultivating curiosity and celebrating science
        </h4>
        <p className={styles.para}>
          Our endeavor is to bring to you the best collection of products &
          services on continuing basis and we hope they allow you to see science
          in a new light.
        </p>

        <div className={styles.searchBox}>
          <input
            styles={styles.searchInput}
            type="text"
            placeholder="Type to Search Shop..."
          />
          <div styles={styles.searchButton}>
            <button>Search</button>
          </div>
        </div>

        <div className={styles.socialIcons}>
          <a href="/">
            <i className="bx bxl-instagram"></i>
          </a>
          <a href="/">
            <i className="bx bxl-twitter"></i>
          </a>
          <a href="/">
            <i className="bx bxl-youtube"></i>
          </a>
          <a href="/">
            <i className="bx bxl-facebook"></i>
          </a>
        </div>
      </div>
      <div className={styles.right}>
        <Image
          className={`${styles.homeImage} ${styles.homeImage1}`}
          src={"/static/images/home/home1.jpg"}
          width="500"
          height={"500"}
          alt="Home Image1"
        />
        <Image
          className={`${styles.homeImage} ${styles.homeImage2}`}
          src={"/static/images/home/home2.jpg"}
          width="500"
          height={"500"}
          alt="Home Image2"
        />

        <div className={styles.message}>
          <p>
            Hi, I’M JP Brar <br /> I’M
            <span className={styles.color2}> TEACHER..</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomeSection;
