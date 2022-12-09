import Image from "next/image";
import Router from "next/router";
import React, { useState } from "react";
import styles from "../../styles/shop/Home.module.css";
const HomeSection = () => {
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
    console.log("DKLDF ", searchQuery);
    Router.push(`/shop/products/${searchQuery}`);
    // Router.push("/");
  };

  return (
    <div className={styles.container}>
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
      <div className={styles.subContainer}>
        <div className={styles.left}>
          <h1 className={styles.mainHeading}>
            WELCOME TO <span className={styles.color}>BRAR SCRIBBLE</span>
          </h1>
          <h3 className={styles.subHeading}>
            Communicating Science with Creative Articles
          </h3>
          <p className={styles.para}>
            Brar Scribbles is an online shop that celebrates science & helps to
            promote diversity in <span className={styles.color}>science</span>,
            <span className={styles.color}> technology</span>,
            <span className={styles.color}> engineering</span> &
            <span className={styles.color}> math</span> (STEM). Our aim is to
            demystify Science by creating
            <span className={styles.color}> easy</span>,
            <span className={styles.color}> interactive</span> and ,
            <span className={styles.color}> enjoyable </span>
            Learning Resources.
          </p>
          <button className={styles.button}>SHOP NOW</button>
        </div>
        <div className={styles.right}>
          <div className={styles.imageContainer}>
            <Image
              className={`${styles.image} ${styles.image1}`}
              src={"/static/images/shop/shop1.jpg"}
              width="400"
              height={"400"}
              alt="Shop Home Image1"
            />
            <Image
              className={`${styles.image} ${styles.image2}`}
              src={"/static/images/shop/shop2.jpg"}
              width="400"
              height={"400"}
              alt="Shop Home Image2"
            />
            <Image
              className={`${styles.image} ${styles.image3}`}
              src={"/static/images/shop/shop3.jpg"}
              width="400"
              height={"400"}
              alt="Shop Home Image3"
            />
            <Image
              className={`${styles.image} ${styles.image4}`}
              src={"/static/images/shop/shop4.jpg"}
              width="400"
              height={"400"}
              alt="Shop Home Image4"
            />
            <Image
              className={`${styles.image} ${styles.image5}`}
              src={"/static/images/shop/shop5.jpg"}
              width="400"
              height={"400"}
              alt="Shop Home Image5"
            />
          </div>
        </div>
      </div>
      <div className={styles.qualityWrapper}>
        <div className={styles.qualityContainer}>
          <i class="bx bx-rocket"></i>
          <div className={styles.qualityContent}>
            <h1 className={styles.qualityHeading}>FASTEST DELIVERY</h1>
            <p className={styles.qualityPara}>Fastest & Safest delivery</p>
          </div>
        </div>
        <div className={styles.qualityContainer}>
          <i class="bx bx-refresh"></i>
          <div className={styles.qualityContent}>
            <h1 className={styles.qualityHeading}>QUALITY PRODUCT</h1>
            <p className={styles.qualityPara}>Assured quality of product</p>
          </div>
        </div>
        <div className={styles.qualityContainer}>
          <i class="bx bxs-credit-card"></i>
          <div className={styles.qualityContent}>
            <h1 className={styles.qualityHeading}>SECURE PAYMENT</h1>
            <p className={styles.qualityPara}>100% secure payment</p>
          </div>
        </div>
        <div
          className={`${styles.qualityContainer} ${styles.qualityContainer4}`}
        >
          <i class="bx bx-chat"></i>
          <div className={styles.qualityContent}>
            <h1 className={styles.qualityHeading}>24/7 Support</h1>
            <p className={styles.qualityPara}>Dedicated support</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeSection;
