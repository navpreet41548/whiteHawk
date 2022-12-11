import Image from "next/image";
import React from "react";
import styles from "../../styles/AboutSection.module.css";

const AboutSection = () => {
  return (
    <div className={styles.aboutContainer}>
      <h2 className={styles.aboutTitle}>ABOUT</h2>
      <div className={styles.aboutSubContainer}>
        <div className={styles.aboutLeft}>
          <div className={styles.aboutImageWrapper}>
            <Image
              className={styles.aboutImage}
              src={"/static/images/about/about.jpg"}
              alt="About Image"
              width={600}
              height={600}
              loading="lazy"
            />
            <div className={styles.aboutImageTitle}>
              <p>JP BRAR</p>
            </div>
            <div className={styles.aboutSocialContainer}>
              <a href="https://www.instagram.com/brar_scribbles/">
                <i class="bx bxl-instagram"></i>
              </a>
              <a href="https://www.facebook.com/brar.scribbles">
                <i class="bx bxl-facebook-square"></i>
              </a>
              <a href="https://www.youtube.com/@BrarScribbles">
                <i class="bx bxl-youtube"></i>
              </a>
            </div>
          </div>
        </div>
        <div className={styles.aboutRight}>
          <h1 className={styles.aboutHeading}>
            HI, I&apos;M <span className={styles.color3}>JP BRAR</span>
          </h1>
          <p className={styles.aboutSubHeading}>
            Teacher by Profession<span className={styles.color}> & </span>
            Artist by Passion
          </p>
          <p className={styles.aboutPara}>
            I’m the author and illustrator of Brar Scribbles. After completing
            my Master’s degree in Engineering from
            <span className={styles.color}>Thapar University, Patiala,</span>I
            got the chance to work as Assistant Professor in various reputed
            universities. That is where I have developed love and passion for
            teaching. Now I am running my own educational institute
            <span className={styles.color}>(WHITEHAWK ACADEMY)</span> and it is
            one of its own kind. I love communicating science and always try to
            bring new, creative, engaging, fun, and interactive tools to help
            students for better subject understanding. Also, I was fond of
            sketching & art since my childhood. So, with love for the ART &
            passion for TEACHING, I combined the two and{" "}
            <span className={styles.color}> BRAR SCRIBBLES </span>was born 🤗.
            It is a an awesome blend of art and science, creating a unique way
            to communicate science and cultivate curiosity among the learners.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
