import Router from "next/router";
import React from "react";
import styles from "/styles/popup/CategoryConfirm.module.css";

const CategoryConfirm = (props) => {
  //   const wrapper = document.querySelectorAll("[data-container]")[0];
  //   if (wrapper) {
  //     wrapper.style.opacity = "1";
  //     wrapper.style.pointerEvents = "all";
  //   }

  const handleNo = () => {
    const wrapper = document.querySelectorAll("[data-container]")[0];
    wrapper.style.opacity = "0";
    wrapper.style.pointerEvents = "none";
  };

  const handleYes = async (uniqueId) => {
    const data = await fetch(`/api/shop/admin/aproduct/${uniqueId}`, {
      method: "DELETE",
    });
    const dbData = await data.json();
    console.log(dbData);
    if (!dbData.err) {
      const wrapper = document.querySelectorAll("[data-container]")[0];

      if (wrapper) {
        wrapper.style.display = "none";
      }
      Router.push(`/shop/products/allProducts`);
    }
  };

  return (
    <div className={styles.productConfirmWrapper} data-container>
      <div className={styles.productConfirmContainer}>
        <p>Are you sure to cancel the Product</p>
        <div className={styles.buttonContainer}>
          <button onClick={() => handleYes(props.uniqueId)}>Yes</button>
          <button onClick={() => handleNo()}>No</button>
        </div>
      </div>
    </div>
  );
};

export default CategoryConfirm;
