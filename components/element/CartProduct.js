import Image from "next/image";
import Link from "next/link";
import { Router, useRouter } from "next/router";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { removeCartItem, updateCartItem } from "../../store/cartSlice";
import styles from "/styles/shop/CartProduct.module.css";

const CartProduct = (props) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [quantity, setQuantity] = useState(props.quantity);

  const handleQuantityChange = (e) => {
    const productId = props.product._id;
    console.log();
    setQuantity(e.target.value);
    const productDetail = {
      productId,
      quantity: e.target.value,
      price: props.product.discountPrice,
    };
    dispatch(updateCartItem(productDetail));
  };

  const handleCartDelete = (id) => {
    dispatch(removeCartItem(id));
    window.location.reload(false);
  };

  return (
    <div className={styles.productContainer}>
      <div className={styles.left}>
        <div className={styles.imageWrapper}>
          {props.product.images[0].maintainOriginalRatio ? (
            <Image
              width={200}
              height={300}
              alt={"Product Image"}
              className={`${styles.image} ${styles.maintainRatio}`}
              src={props.product.images[0].imageSrc}
            />
          ) : (
            <Image
              width={200}
              height={300}
              alt={"Product Image"}
              className={styles.image}
              src={props.product.images[0].imageSrc}
            />
          )}
        </div>
      </div>

      <div className={styles.right}>
        <div className={styles.rightSubContainer}>
          <Link href={`/shop/product/${props.product.productSlug}`}>
            <p className={styles.title}>{props.product.title}</p>
          </Link>
          <div className={styles.starContainer}>
            <i class="bx bxs-star"></i>
            <i class="bx bxs-star"></i>
            <i class="bx bxs-star"></i>
            <i class="bx bxs-star"></i>
            <i class="bx bxs-star"></i>
            <span className={styles.starNum}>100</span>
          </div>

          <div className={styles.priceContainer}>
            <div className={styles.subContainer}>
              <span className={styles.discountPrice}>
                ${props.product.discountPrice}
              </span>
              <span className={styles.actualPrice}>
                ${props.product.actualPrice}
              </span>
            </div>
            <span className={styles.off}>50% off</span>
          </div>

          <p className={styles.shortDesc}>{props.product.shortDesc}</p>
        </div>
        <div className={styles.cartAction}>
          <select
            className={styles.quantity}
            onChange={(e) => handleQuantityChange(e)}
            value={quantity}
          >
            <option value={1}>QUANTITY : 1</option>
            <option value={2}>QUANTITY : 2</option>
            <option value={3}>QUANTITY : 3</option>
            <option value={4}>QUANTITY : 4</option>
            <option value={5}>QUANTITY : 5</option>
            <option value={6}>QUANTITY : 6</option>
            <option value={7}>QUANTITY : 7</option>
            <option value={8}>QUANTITY : 8</option>
            <option value={9}>QUANTITY : 9</option>
            <option value={10}>QUANTITY : 10</option>
          </select>
          <i
            class="bx bx-trash"
            onClick={() => handleCartDelete(props.product._id)}
          ></i>
        </div>
      </div>
    </div>
  );
};

export default CartProduct;
