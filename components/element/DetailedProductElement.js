import Image from "next/image";
import React, { useEffect, useState } from "react";
import styles from "../../styles/shop/DetailedProductElement.module.css";
import DragAndDrop from "./DragAndDrop";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { addCartItem, removeCartItem } from "../../store/cartSlice";
import dynamic from "next/dynamic";
import Link from "next/link";

const DetailedProductElement = (props) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const userState = useSelector((state) => state.user);
  const [inCart, setInCart] = useState();
  const [imagePreview, setImagePreview] = useState({
    imageSrc: props.product.images[0] && props.product.images[0].imageSrc,
    maintainOriginalRatio:
      props.product.images[0] && props.product.images[0].maintainOriginalRatio,
  });
  const [isAddMore, setIsAddMore] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [user, setUser] = useState();
  const [buyLink, setBuyLink] = useState();

  const images = props.product.images;

  const imageClick = (imageSrc) => {
    setIsAddMore(false);
    setImagePreview(imageSrc);
  };

  const handleQuantity = (opp) => {
    if (opp == "plus") setQuantity(quantity + 1);
    if (opp == "minus") {
      setQuantity(quantity - 1);
      if (quantity <= 1) {
        setQuantity(1);
      }
    }
  };

  const handleCartAdd = (productId) => {
    const productDetail = {
      productId,
      quantity,
      price: props.product.discountPrice,
      total: quantity * props.product.discountPrice,
    };
    dispatch(addCartItem(productDetail));
  };

  const handleCartRemove = (productId) => {
    dispatch(removeCartItem(productId));
  };

  // https://api.whatsapp.com/send?phone=919463419478&text=http://localhost:3000/shop/product/product-1-on-mongodb-cluster-product-1-on-mongodb-cluster-product-1-on-mongodb-cluster

  useEffect(() => {
    // for (let i = 0; i < cart.cartItem.length; i++) {
    //   const element = cart.cartItem[i];
    //   if (element.productId == props.product._id) {
    //     setInCart(true);
    //   } else {
    //     setInCart(false);
    //   }
    // }

    const link = `https://api.whatsapp.com/send?phone=919463419478&text= "Hey There! I want to buy ${quantity} of ${props.product.title}`;

    setBuyLink(link);
    const containObj = () => {
      for (let i = 0; i < cart.cartItem.length; i++) {
        const element = cart.cartItem[i];
        if (element.productId == props.product._id) {
          return true;
        }
      }
      return false;
    };
    setInCart(containObj());
    setUser(userState.user);
    // cart.cartItem.includes(element.productId)
  }, [cart.cartItem, props.product, userState]);

  return (
    <div className={styles.productContainer}>
      {user && user.admin && (
        <Link
          className={styles.edit}
          href={`/shop/admin/editProduct/${props.product.productSlug}`}
        >
          <i class="bx bx-pencil"></i> Edit
        </Link>
      )}
      <div className={styles.left}>
        <div className={styles.imageContainer}>
          {images.map((image, i) => (
            <div
              key={i}
              className={styles.smallImageWrapper}
              onClick={() => {
                imageClick(image);
              }}
            >
              <Image
                src={image.imageSrc}
                width="100"
                height={"100"}
                alt="Product Image"
                className={styles.smallImage}
              />
            </div>
          ))}
        </div>

        <div className={styles.productImageWrapper}>
          {imagePreview.maintainOriginalRatio && (
            <Image
              src={imagePreview.imageSrc}
              width="500"
              height={"1000"}
              alt="Product Image"
              className={`${styles.productImage} ${styles.maintainRatio}`}
            />
          )}
          {!imagePreview.maintainOriginalRatio && (
            <Image
              src={imagePreview.imageSrc}
              width="500"
              height={"1000"}
              alt="Product Image"
              className={styles.productImage}
            />
          )}
        </div>
      </div>
      <div className={styles.right}>
        <h1 className={styles.productTitle}>{props.product.title}</h1>

        <div className={styles.priceContainer}>
          <h1>
            MRP : <span className={styles.actualPrice}>$100</span>
            <span className={styles.discountPrice}> $50</span>
          </h1>
        </div>

        <div className={styles.buttonContainer}>
          <div className={styles.quantityContainer}>
            <div>
              Quantity:
              <button
                onClick={() => handleQuantity("plus")}
                className={styles.plus}
              >
                <i className="bx bx-plus"></i>
              </button>
              <span className={styles.currentQuantity}> {quantity} </span>
              <button
                onClick={() => handleQuantity("minus")}
                className={styles.minus}
              >
                <i className="bx bx-minus"></i>
              </button>
            </div>
          </div>
          <div className={styles.buttonSubContainer}>
            <a href={buyLink} className={styles.button}>
              BUY VIA WHATSAPP
            </a>

            {inCart ? (
              <a
                className={styles.button}
                onClick={() => handleCartRemove(props.product._id)}
              >
                REMOVE FROM CART
              </a>
            ) : (
              <a
                className={styles.button}
                onClick={() => handleCartAdd(props.product._id)}
              >
                ADD TO CART
              </a>
            )}
          </div>
        </div>

        <div className={styles.shortDesc}>
          <p className={styles.shortDescPara}>{props.product.shortDesc}</p>
        </div>
        <div className={styles.descContainer}>
          <p className={styles.descHeading}>DESCRIPTION</p>

          <p className={styles.descPara}>
            {props.product.desc}
            {/* This 28 pages Paper back Handbook of Physics Formulae is very useful
            for Class 12th PHYSICS CBSE & State Board Exam Preparation (Medical
            & Non-Medical).
            <br />
            <br />
            It Contains Important Resources & Tips for Last Minute Revision.
            Contains Topic wise Complete 12th Physics (all chapters) Formulae
            and Tips for Quick Revision of Syllabus.
            <br />
            <br />+ List of important derivations, list of important diagrams,
            exam preparation tips, and more!! */}
          </p>
        </div>
      </div>
    </div>
  );
};

// export default dynamic(() => Promise.resolve(DetailedProductElement), {
//   ssr: false,
// });
export default DetailedProductElement;
