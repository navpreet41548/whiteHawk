import Image from "next/image";
import React, { useState } from "react";
import styles from "/styles/ContactForm.module.css";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState("");
  const [err, setErr] = useState({
    nameErr: "",
    emailErr: "",
    subjectErr: "",
    messageErr: "",
    randomErr: "",
  });

  const handleInput = (e) => {
    setErr({
      nameErr: "",
      emailErr: "",
      subjectErr: "",
      messageErr: "",
      randomErr: "",
    });
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData);
  };

  const handleSubmit = async () => {
    if (formData.name == "") {
      return setErr({ nameErr: "Please Enter Name" });
    }

    let re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!re.test(formData.email)) {
      return setErr({ emailErr: "Please Enter A Valid Email" });
    }

    if (formData.email == "") {
      return setErr({ emailErr: "Please Enter Email" });
    }
    if (formData.subject == "") {
      return setErr({ subjectErr: "Please Enter Subject" });
    }
    if (formData.message == "") {
      return setErr({ messageErr: "Please Enter Message" });
    }

    setLoading(true);

    const data = await fetch(`${process.env.BASE_URL}/api/contact`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const dbData = await data.json();
    console.log(dbData);
    if (!dbData.err) {
      setMessage("Form Sent Successfully");
      setErr({
        nameErr: "",
        emailErr: "",
        subjectErr: "",
        messageErr: "",
        randomErr: "",
      });
      setLoading(false);
    }
    if (dbData.err) {
      setLoading(false);

      setErr({ ...err, randomErr: "Something Went Wrong" });
    }
  };
  return (
    <div className={styles.formContainer}>
      {loading && (
        <div className={styles.loadingContainer}>
          <div className={styles.loading}>
            <i class="bx bx-loader-alt bx-spin"></i>
          </div>
        </div>
      )}
      {message && (
        <div className={styles.messageContainer}>
          <div className={styles.messageSubContainer}>
            <p>{message}</p>
          </div>
        </div>
      )}
      <div className={styles.left}>
        <Image
          src={"/static/images/contact/map.jpg.png"}
          width="300"
          height={"300"}
          alt="Map Image"
          className={styles.mapImage}
        />
        <div className={styles.leftContent}>
          <div className={styles.leftTopContent}>
            <h2 className={styles.leftTopHeading}>Let&apos;s get in touch</h2>
            <p className={styles.leftTopPara}>
              We’re open for any suggestion or to just have a chat.
            </p>
          </div>
          <div className={styles.leftCenterContent}>
            <div className={styles.infoWrapper}>
              <i class="bx bxs-phone"></i>
              <p>+91 84279-76607 </p>
            </div>
            <div className={styles.infoWrapper}>
              <i class="bx bxl-gmail"></i>
              <p>brarscribbles@gmail.com </p>
            </div>
            <div className={styles.infoWrapper}>
              <i class="bx bxs-map"></i>
              <p>
                White Hawk Academy OPP. Dadi Poti Park Model Town Phase 3 <br />
                BATHINDA
              </p>
            </div>
          </div>
          <div className={styles.leftBottomContent}>
            <a href="https://in.pinterest.com/brarscribbles/">
              <i class="bx bxl-pinterest"></i>
            </a>
            <a href="https://www.instagram.com/brar_scribbles/">
              <i class="bx bxl-instagram"></i>
            </a>
            <a href="https://www.youtube.com/channel/UCP7baQZYF2uL-s5-c8arukQ?view_as=subscriber">
              <i class="bx bxl-youtube"></i>
            </a>
            <a href="https://www.facebook.com/brar.scribbles">
              <i class="bx bxl-facebook"></i>
            </a>
          </div>
        </div>
      </div>
      <div className={styles.right}>
        <h1 className={styles.rightHeading}>CONTACT US</h1>
        <div className={styles.formWrapper}>
          <div className={styles.firstInputWrapper}>
            <div className={styles.inputWrapper}>
              {err.nameErr && (
                <p className={styles.errMessage}>{err.nameErr}</p>
              )}
              <i class="bx bx-user"></i>
              <input
                name="name"
                onChange={(e) => handleInput(e)}
                className={styles.input}
                placeholder="NAME"
              />
            </div>

            <div className={styles.inputWrapper}>
              {err.emailErr && (
                <p className={styles.errMessage}>{err.emailErr}</p>
              )}
              <i class="bx bxl-gmail"></i>
              <input
                name="email"
                onChange={(e) => handleInput(e)}
                className={styles.input}
                placeholder="EMAIL"
              />
            </div>
          </div>

          <div className={styles.inputWrapper}>
            {err.subjectErr && (
              <p className={styles.errMessage}>{err.subjectErr}</p>
            )}
            <i class="bx bx-message-detail"></i>
            <input
              name="subject"
              onChange={(e) => handleInput(e)}
              className={styles.input}
              placeholder="SUBJECT"
            />
          </div>

          <div className={styles.inputWrapper}>
            {err.messageErr && (
              <p className={styles.errMessage}>{err.messageErr}</p>
            )}
            <i class="bx bx-message-detail"></i>
            <textarea
              name="message"
              onChange={(e) => handleInput(e)}
              className={`${styles.input} ${styles.textarea}`}
              placeholder="MESSAGE"
            ></textarea>
          </div>
        </div>
        <button onClick={() => handleSubmit()} className={styles.button}>
          SEND
        </button>
      </div>
    </div>
  );
};

export default ContactForm;
