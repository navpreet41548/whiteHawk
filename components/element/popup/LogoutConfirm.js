import Router from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateForm } from "../../../store/formSlice";
import styles from "/styles/popup/ProductConfirm.module.css";

const LogoutConfirm = (props) => {
  const dispatch = useDispatch();
  const [errMessage, setErrMessage] = useState();

  const handleNo = () => {
    const wrapper = document.querySelectorAll("[data-container]")[0];
    wrapper.style.display = "none";
  };

  const handleYes = async () => {
    const data = await fetch(`${process.env.BASE_URL}/api/user/logout`, {
      method: "POST",
    });
    const dbData = await data.json();
    console.log(dbData);
    if (!dbData.err) {
      const wrapper = document.querySelectorAll("[data-container]")[0];
      if (wrapper) {
        wrapper.style.opacity = "0";
        wrapper.style.pointerEvents = "none";
      }
      dispatch(updateForm({ login: false, visible: false }));

      Router.push(`/shop/home`);
    } else {
      setErrMessage(dbData.message);
    }
  };

  return (
    <div data-container className={styles.productConfirmWrapper}>
      <div className={styles.productConfirmContainer}>
        <p>Do you want to Logout </p>
        <div className={styles.buttonContainer}>
          <button onClick={() => handleYes()}>Yes</button>
          <button onClick={() => handleNo()}>No</button>
        </div>
      </div>
    </div>
  );
};

export default LogoutConfirm;
