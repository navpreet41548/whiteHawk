import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCartItem, removeCartItem } from "../../store/cartSlice";
import { addWishList, removeWishList } from "../../store/wishlistSlice";
import styles from "../../styles/shop/ProductElement.module.css";

const ProductElement = (props) => {
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist);
  const userState = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);
  const [inWishlist, setInWishlist] = useState();
  const [inCart, setInCart] = useState();
  const [user, setUser] = useState();
  const [discount, setDiscount] = useState();

  const handleWishlistAdd = () => {
    dispatch(addWishList(props.product._id));
  };

  const handleWishlistRemove = () => {
    dispatch(removeWishList(props.product._id));
    window.location.reload(false);
  };

  const handleCartAdd = () => {
    const productDetail = {
      productId: props.product._id,
      quantity: 1,
      price: props.product.discountPrice,
    };
    dispatch(addCartItem(productDetail));
  };

  const handleCartDelete = () => {
    const id = props.product._id;
    dispatch(removeCartItem(id));
  };

  useEffect(() => {
    setDiscount(
      (100 * (props.product.actualPrice - props.product.discountPrice)) /
        props.product.actualPrice
    );
    const checkInclude = () => {
      for (let i = 0; i < wishlist.wishlistItem.length; i++) {
        const element = wishlist.wishlistItem[i];
        if (element == props.product._id) {
          return true;
        }
      }
      return false;
    };

    setInWishlist(checkInclude());

    const checkInCart = () => {
      for (let i = 0; i < cart.cartItem.length; i++) {
        const element = cart.cartItem[i];
        if (element.productId == props.product._id) {
          return true;
        }
      }
      return false;
    };
    setInCart(checkInCart());

    setUser(userState.user);
  }, [wishlist.wishlistItem, props, cart.cartItem, userState]);

  return (
    <div className={styles.ProductContainer}>
      {user && user.admin && (
        <Link
          className={styles.edit}
          href={`/shop/admin/editProduct/${props.product.productSlug}`}
        >
          <i class="bx bx-pencil"></i> Edit
        </Link>
      )}
      <>
        <div className={styles.top}>
          {inWishlist && !props.wishlist && (
            <div
              className={styles.heartContainer}
              onClick={() => handleWishlistRemove()}
            >
              <i class="bx bxs-heart "></i>
            </div>
          )}
          {!inWishlist && !props.wishlist && (
            <div
              className={styles.heartContainer}
              onClick={() => handleWishlistAdd()}
            >
              <i class="bx bx-heart "></i>
            </div>
          )}
          <div className={styles.imageWrapper}>
            {props.product.images[0].maintainOriginalRatio && (
              <Image
                className={`${styles.image} ${styles.maintainRatio}`}
                src={props.product.images[0].imageSrc}
                width={500}
                height={500}
                alt={"Product Image"}
              />
            )}
            {!props.product.images[0].maintainOriginalRatio && (
              <Image
                className={`${styles.image} `}
                src={props.product.images[0].imageSrc}
                width={500}
                height={500}
                alt={"Product Image"}
              />
            )}
          </div>
        </div>
        <div className={styles.bottom}>
          <div className={styles.subBottom}>
            <Link href={`/shop/product/${props.product.productSlug}`}>
              <p className={styles.title}> {props.product.title}</p>
            </Link>
            <div className={styles.starContainer}>
              <i class="bx bxs-star"></i>
              <i class="bx bxs-star"></i>
              <i class="bx bxs-star"></i>
              <i class="bx bxs-star"></i>
              <i class="bx bxs-star"></i>
              100
            </div>

            <div className={styles.priceWrapper}>
              <div className={styles.priceContainer}>
                <span className={styles.discountPrice}>
                  ₹{props.product.discountPrice}
                </span>
                <span className={styles.actualPrice}>
                  ₹{props.product.actualPrice}
                </span>
              </div>
              {discount > 0 && (
                <span className={styles.off}>{discount}% off</span>
              )}
            </div>

            <div className={styles.desc}>
              <p>{props.product.shortDesc}</p>
            </div>
          </div>
          {props.wishlist && (
            <div className={styles.cartAction}>
              {inCart ? (
                <button
                  className={styles.cartButton}
                  onClick={(e) => handleCartDelete()}
                >
                  REMOVE FROM CART
                </button>
              ) : (
                <button
                  className={styles.cartButton}
                  onClick={(e) => handleCartAdd()}
                >
                  ADD TO CART
                </button>
              )}
              <i class="bx bx-trash" onClick={() => handleWishlistRemove()}></i>
            </div>
          )}
        </div>
      </>
      {/* )} */}
    </div>
  );
};

export default ProductElement;
