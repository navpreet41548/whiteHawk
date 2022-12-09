import Router from "next/router";
import React from "react";
import styles from "/styles/popup/ProductConfirm.module.css";

const ProductConfirm = (props) => {
  const handleNo = () => {
    const wrapper = document.getElementsByClassName(
      "ProductConfirm_productConfirmWrapper__BOXyy"
    )[0];

    wrapper.style.display = "none";
  };

  const handleYes = async (uniqueId) => {
    const data = await fetch(`/api/shop/admin/aproduct/${uniqueId}`, {
      method: "DELETE",
    });
    const dbData = await data.json();
    console.log(dbData);
    if (!dbData.err) {
      const wrapper = document.getElementsByClassName(
        "ProductConfirm_productConfirmWrapper__BOXyy"
      )[0];

      if (wrapper) {
        wrapper.style.display = "none";
      }
      Router.push(`/shop/products/allProducts`);
    }
  };

  return (
    <div className={styles.productConfirmWrapper}>
      <div className={styles.productConfirmContainer}>
        <p>Are you sure to cancel the Product</p>
        <div className={styles.buttonContainer}>
          <button onClick={() => handleYes(props.uniqueId)}>Yes, Delete</button>
          <button onClick={() => handleNo()}>No</button>
        </div>
      </div>
    </div>
  );
};

export default ProductConfirm;
