import Head from "next/head";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import styles from "../../styles/HomeSection.module.css";
import Typed from "typed.js";
import Router from "next/router";
import Link from "next/link";

const HomeSection = () => {
  const el = useRef(null);

  const [searchValue, setSearchValue] = useState("");

  const onSearch = () => {
    // const tagArrays = searchValue.split(" ");
    // const searchQuery = "search" + searchValue;

    const camelCase = searchValue
      .replace(/\s(.)/g, function (a) {
        return a.toUpperCase();
      })
      .replace(/\s/g, "")
      .replace(/^(.)/, function (b) {
        return b.toLowerCase();
      });
    const searchQuery =
      "search" + camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
    Router.push(`/shop/products/${searchQuery}`);
    // Router.push("/");
  };

  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: ["Teacher", "Artist"],
      startDelay: 300,
      typeSpeed: 150,
      backDelay: 150,
      backSpeed: 150,
      smartBackspace: true,
      showCursor: true,
      loop: true,
    });
  }, []);

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
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value);
            }}
          />
          <div styles={styles.searchButton}>
            <button onClick={() => onSearch()}>Search</button>
          </div>
        </div>

        <div className={styles.socialIcons}>
          <a href="https://www.instagram.com/brar_scribbles/">
            <i className="bx bxl-instagram"></i>
          </a>
          <a href="https://in.pinterest.com/brarscribbles/">
            <i class="bx bxl-pinterest"></i>
          </a>
          <a href="https://www.facebook.com/brar.scribbles">
            <i class="bx bxl-facebook"></i>
          </a>
          <a href="https://www.youtube.com/@BrarScribbles">
            <i className="bx bxl-youtube"></i>
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
          <p className={styles.animationPara}>
            Hi, I’M JP Brar <br /> I’M{" "}
            <span ref={el} className={styles.color2}></span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomeSection;
