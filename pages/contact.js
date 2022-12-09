import React, { useState } from "react";
import ContactForm from "../components/element/ContactForm";
import Layout from "../components/Layout";
import styles from "/styles/Contact.module.css";

const Contact = () => {
  const [isOpen0, setIsOpen0] = useState(false);
  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);

  const handleHeadClick = (i) => {
    console.log(i);
    if (i == 0) {
      setIsOpen0(!isOpen0);
    }
    if (i == 1) {
      setIsOpen1(!isOpen1);
    }
    if (i == 2) {
      setIsOpen2(!isOpen2);
    }
    // const head = document.querySelectorAll(`[data-head]`)[i];
    // const faqContainer = head.parentNode;
    // const faqContent = document.querySelectorAll(`[data-content]`)[i];
  };
  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.top}>
          <ContactForm />
        </div>
        <div className={styles.bottom}>
          <h2 className={styles.heading}>
            FAQ<span className={styles.color}>&apos;</span>s
          </h2>
          <div className={styles.faqWrapper}>
            <div className={styles.faqContainer}>
              <div
                data-head
                className={styles.faqHead}
                onClick={() => handleHeadClick(0)}
              >
                {isOpen0 ? (
                  <i className={`bx bxs-chevron-down ${styles.up}`}></i>
                ) : (
                  <i className={`bx bxs-chevron-down`}></i>
                )}
                <p>Questions about an Order?</p>
              </div>
              {isOpen0 ? (
                <div
                  className={`${styles.faqContent} ${styles.open}`}
                  data-content
                >
                  If you have any issues or questions related to an item from
                  <span className={styles.color}>
                    https://brarscribbles.com
                  </span>
                  , email store support directly or use this form. Be sure to
                  include your order number. If you placed an order via another
                  site like Amazon, you will need to contact that company for
                  assistance.
                </div>
              ) : (
                <div className={`${styles.faqContent}`} data-content>
                  If you have any issues or questions related to an item from
                  <span className={styles.color}>
                    https://brarscribbles.com
                  </span>
                  , email store support directly or use this form. Be sure to
                  include your order number. If you placed an order via another
                  site like Amazon, you will need to contact that company for
                  assistance.
                </div>
              )}
            </div>
            <div className={styles.faqContainer}>
              <div
                data-head
                className={styles.faqHead}
                onClick={() => handleHeadClick(1)}
              >
                {isOpen1 ? (
                  <i className={`bx bxs-chevron-down ${styles.up}`}></i>
                ) : (
                  <i className={`bx bxs-chevron-down`}></i>
                )}
                <p>Where can I get your books and other products?</p>
              </div>
              {isOpen1 ? (
                <div
                  className={`${styles.faqContent} ${styles.open}`}
                  data-content
                >
                  All of my products are sold directly through
                  <span className={styles.color}> brarscribbles.com</span> Brar
                  Scribbles Notes are also available on Amazon.
                </div>
              ) : (
                <div className={styles.faqContent} data-content>
                  All of my products are sold directly through
                  <span className={styles.color}> brarscribbles.com</span> Brar
                  Scribbles Notes are also available on Amazon.
                </div>
              )}
            </div>
            <div className={styles.faqContainer}>
              <div
                data-head
                className={styles.faqHead}
                onClick={() => handleHeadClick(2)}
              >
                {isOpen2 ? (
                  <i className={`bx bxs-chevron-down ${styles.up}`}></i>
                ) : (
                  <i className={`bx bxs-chevron-down`}></i>
                )}
                <p>Business Opportunities</p>
              </div>
              {isOpen2 ? (
                <div
                  className={`${styles.faqContent} ${styles.open}`}
                  data-content
                >
                  If you would like to discuss paid commissions, licensing, or
                  other business opportunities please describe the project and
                  budget in as much detail as you can. For product related
                  inquiries such as wholesale, distribution and bulk orders, use
                  the store contact form.
                </div>
              ) : (
                <div className={styles.faqContent} data-content>
                  If you would like to discuss paid commissions, licensing, or
                  other business opportunities please describe the project and
                  budget in as much detail as you can. For product related
                  inquiries such as wholesale, distribution and bulk orders, use
                  the store contact form.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      ;
    </Layout>
  );
};

export default Contact;
