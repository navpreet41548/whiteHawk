import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "/styles/shop/SummaryProduct.module.css";

const CartProduct = (props) => {
  const cart = useSelector((state) => state.cart);
  const [quantity, setQuantity] = useState();
  const [productId, setProductId] = useState(props.item._id);

  useEffect(() => {
    setProductId(props.item._id);

    const objIndex = cart.cartItem.findIndex(
      (obj) => obj.productId == productId
    );
    if (objIndex >= 0) {
      setQuantity(cart.cartItem[objIndex].quantity);
    }
    console.log(objIndex);
  }, [cart.cartItem, productId, props.item._id]);

  return (
    <div className={styles.summaryProduct}>
      <p>{props.item.title}</p>
      <p className={styles.summaryPrice}>
        <span>{quantity}</span>
        <span className={styles.price}>(${props.item.discountPrice})</span>
      </p>
    </div>
  );
};

export default CartProduct;
