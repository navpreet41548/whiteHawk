import React, { useEffect, useState } from "react";
import ProductElement from "../../components/element/ProductElement";
import SummaryProduct from "../../components/element/SummaryProduct";
import Layout from "../../components/Layout";
import styles from "/styles/shop/Cart.module.css";
import { useSelector } from "react-redux";
import CartProduct from "../../components/element/CartProduct";
import Image from "next/image";
import EmptyMessage from "../../components/element/EmptyMessage";
import Link from "next/link";

const Cart = (props) => {
  const cart = useSelector((state) => state.cart);
  const [total, setTotal] = useState();
  let prices = [];

  useEffect(() => {
    for (let i = 0; i < cart.cartItem.length; i++) {
      const element = cart.cartItem[i];
      prices.push(element.total);
    }
    const sum = prices.reduce((partialSum, a) => partialSum + a, 0);
    setTotal(sum);
  }, [cart]);

  return (
    <Layout>
      {props.products != 0 && (
        <div className={styles.container}>
          <div className={styles.CartProductWrapper}>
            {props.products &&
              props.products.map((item, i) => (
                <CartProduct
                  key={i}
                  product={item}
                  cart={true}
                  quantity={item.quantity}
                />
              ))}
          </div>
          <div className={styles.cartSummary}>
            <div className={styles.summaryContainer}>
              <h1 className={styles.summaryHeading}>CART SUMMARY</h1>
              <div className={styles.summaryProductContainer}>
                {props.products.map((item, i) => (
                  <SummaryProduct key={i} item={item} />
                ))}
              </div>

              <div className={styles.summarySubTotal}>
                <h1>SUB TOTAL</h1>
                <p>${total}</p>
              </div>

              <button className={styles.summaryButton}>BUY VIA WHATSAPP</button>
            </div>
          </div>
        </div>
      )}
      {props.products.length == 0 && (
        <EmptyMessage
          message={"Your Cart is Empty"}
          imageName={"emptyCart.png"}
        />
      )}
    </Layout>
  );
};

export default Cart;

export async function getServerSideProps(context) {
  const cookies = context.req.cookies.CartItem;

  if (cookies) {
    const productIds = JSON.parse(cookies);

    let products = [];
    let prices = [];

    for (let i = 0; i < productIds.length; i++) {
      const element = productIds[i];
      const data = await fetch(
        `${process.env.BASE_URL}/api/shop/product/productById/${element.productId}`
      );
      const dbData = await data.json();
      if (!dbData.err) {
        dbData.data.quantity = element.quantity;
        products.push(dbData.data);
        const price = element.quantity * dbData.data.discountPrice;
        prices.push(price);
      }
    }
    return {
      props: { products, prices }, // will be passed to the page component as props
    };
  } else {
    let products = [];
    let prices = [];
    return {
      props: { products, prices }, // will be passed to the page component as props
    };
  }
}
