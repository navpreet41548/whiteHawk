import Link from "next/link";
import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import EmptyMessage from "../../components/element/EmptyMessage";
import ProductElement from "../../components/element/ProductElement";
import Layout from "../../components/Layout";
import styles from "/styles/shop/WishList.module.css";

const WishList = (props) => {
  const wishlist = useSelector((state) => state.wishlist);

  useEffect(() => {
    //  const found = wishlist.wishlistItem.some((r) => props.products.indexOf(r) >= 0);
    //  console.log(found)
    // const checkArr = () => {
    //   for (let u = 0; u < wishlist.wishlistItem.length; u++) {
    //     const element = wishlist.wishlistItem[u];
    //     for (let i = 0; i < props.products.length; i++) {
    //       const element2 = props.products[i];
    //       if (element == element2._id) {
    //         return true;
    //       }
    //     }
    //     return false;
    //   }
    // };
    // console.log(checkArr());
    // for (let i = 0; i < wishlist.wishlistItem.length; i++) {
    //   const element = wishlist.wishlistItem[i];
    //   fetchProduct(element);
    // }
    //   setProducts(wishlist.wishlistItem);
  }, [props.products, wishlist.wishlistItem]);

  return (
    <Layout>
      {props.products.length != 0 && (
        <div className={styles.container}>
          <p className={styles.breadCrumb}>
            <Link href={"/shop/home"}>Shop/Products</Link>
            <Link className={styles.current} href={`/shop/products/wishlist`}>
              /Wishlist
            </Link>
          </p>
          <div className={styles.productWrapper}>
            {props.products.map((item, i) => (
              <ProductElement
                key={i}
                product={item}
                productId={item}
                wishlist={true}
                //   wishlist={true}
              />
            ))}
          </div>
        </div>
      )}
      {props.products.length == 0 && (
        <EmptyMessage
          message={"Your Wishlist is empty"}
          imageName={"emptyWishlist.png"}
        />
      )}
    </Layout>
  );
};

export default WishList;

export async function getServerSideProps(context) {
  const cookies = context.req.cookies.WishList;

  if (cookies) {
    const productIds = JSON.parse(cookies);

    let products = [];

    for (let i = 0; i < productIds.length; i++) {
      const element = productIds[i];
      const data = await fetch(
        `${process.env.BASE_URL}/api/shop/product/productById/${element}`
      );
      const dbData = await data.json();
      products.push(dbData.data);
    }
    return {
      props: { products }, // will be passed to the page component as props
    };
  } else {
    let products = [];
    return {
      props: { products }, // will be passed to the page component as props
    };
  }
}
