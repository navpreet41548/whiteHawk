import Image from "next/image";
import React from "react";
import styles from "../styles/Footer.module.css";

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.subContainer}>
        <div className={styles.left}>
          <div className={styles.logoContainer}>
            <Image
              className={`${styles.footerLogo} ${styles.footerLogo1} `}
              src={"/static/images/logo/scribbleLogo.png"}
              width="200"
              height={"200"}
              alt="Logo"
            />
            <Image
              className={`${styles.footerLogo} ${styles.footerLogo2} `}
              src={"/static/images/logo/logo.jpg"}
              width="200"
              height={"200"}
              alt="Logo"
            />
          </div>
          <h1 className={styles.logoHeading}>
            <span className={styles.color}>Brar Scribble</span> & WhiteHawk
          </h1>
          <div className={styles.contactContainer}>
            <i className="bx bxl-gmail"></i>
            <h1 className={styles.contactHeading}>brarscribble@gmail.com</h1>
          </div>
          <div className={styles.contactContainer}>
            <i class="bx bx-phone"></i>
            <h1 className={styles.contactHeading}>+91 84279-76607</h1>
          </div>
          <div className={styles.socialContainer}>
            <a href="">
              <i class="bx bxl-pinterest"></i>
            </a>
            <a href="">
              <i class="bx bxl-instagram"></i>
            </a>
            <a href="">
              <i className="bx bxl-gmail"></i>
            </a>
            <a href="">
              <i class="bx bxl-youtube"></i>
            </a>
            <a href="">
              <i class="bx bxl-twitter"></i>
            </a>
          </div>
        </div>
        <div className={styles.center}>
          <h1 className={styles.linkHeading}>QUICK LINKS</h1>
          <h5 className={styles.link}>
            <a href="">FAQS</a>
          </h5>
          <h5 className={styles.link}>
            <a href="">Refunds & Cancelation</a>
          </h5>
          <h5 className={styles.link}>
            <a href="">Disclaimer</a>
          </h5>
          <h5 className={styles.link}>
            <a href="">Terms & Conditions</a>
          </h5>
          <h5 className={styles.link}>
            <a href="">Privacy</a>
          </h5>
        </div>
        <div className={styles.right}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3447.827621454241!2d74.95939734322918!3d30.213466985289653!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391732aeefab33f1%3A0x909d6ccf47840608!2sWhite%20Hawk%20Academy!5e0!3m2!1sen!2sin!4v1670577830154!5m2!1sen!2sin"
            width="400"
            className={styles.map}
            height="300"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
          {/* <iframe
            className={styles.map}
            // src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3447.827595795218!2d74.95904911546238!3d30.213467717522295!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391732aeefab33f1%3A0x909d6ccf47840608!2sWhite%20Hawk%20Academy%20-%20IIT%20Main%2FIIT%20Advanced%2FNEET%2FNTSE%2FKVPY%2FOLYMPIADS%2F!5e0!3m2!1sen!2sin!4v1668923768842!5m2!1sen!2sin"
            width="400"
            height="300"
          ></iframe> */}
        </div>
      </div>
      <h3 className={styles.copyright}>
        All rights reserved @2022 |
        <span className={styles.color}> Brar Scribble</span> & WhiteHawk Academy
      </h3>
    </div>
  );
};

export default Footer;
