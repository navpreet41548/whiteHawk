import React from "react";
import Layout from "../../../components/Layout";
import DetailedProductElement from "../../../components/element/DetailedProductElement";
import styles from "../../../styles/shop/DetailedProduct.module.css";
import Link from "next/link";

const DetailedProduct = (props) => {
  return (
    <Layout>
      <div className={styles.container}>
        {props.product && (
          <div className={styles.breadCrumb}>
            <Link href={`/shop/products/${props.product.category}`}>
              Products/
            </Link>
            <Link className={styles.color} href={"/shop/home"}>
              {props.product.title}
            </Link>
          </div>
        )}
        <DetailedProductElement product={props.product} />
      </div>
      ;
    </Layout>
  );
};

export default DetailedProduct;

export async function getServerSideProps(context) {
  const productSlug = context.params.productSlug;
  const data = await fetch(
    `${process.env.BASE_URL}/api/shop/product/${productSlug}`
  );
  const dbData = await data.json();
  console.log(dbData.data);
  if (dbData.data) {
    return {
      props: { product: dbData.data }, // will be passed to the page component as props
    };
  } else {
    return {
      redirect: {
        permanent: false,
        destination: `/shop/home`,
      },
    };
  }
}
