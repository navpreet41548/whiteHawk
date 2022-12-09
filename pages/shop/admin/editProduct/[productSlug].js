import Link from "next/link";
import React, { useEffect, useState } from "react";
import NewDetailedProduct from "../../../../components/element/NewDetailedProduct";
import Layout from "../../../../components/Layout";
import styles from "/styles/shop/DetailedProduct.module.css";

const CreateProduct = (props) => {
  const [uniqueId, setUniqueId] = useState();
  useEffect(() => {
    const id = "id" + new Date().getTime();
    setUniqueId(id);
    // console.log(props.product.uniqueId);
  }, []);
  return (
    <Layout>
      <div>
        <div className={styles.breadCrumb}>
          <Link href={`/shop/products/allProducts`}>Products/</Link>
          <Link className={styles.color} href={"/shop/home"}>
            Edit Product
          </Link>
        </div>
        <NewDetailedProduct
          uniqueId={props.product.uniqueId}
          edit={true}
          product={props.product}
        />
      </div>
      ;
    </Layout>
  );
};

export default CreateProduct;

export async function getServerSideProps(context) {
  const productSlug = context.params.productSlug;
  const data = await fetch(
    `${process.env.BASE_URL}/api/shop/product/${productSlug}`
  );
  const dbData = await data.json();
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
