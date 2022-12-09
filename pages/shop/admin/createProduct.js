import Link from "next/link";
import React, { useEffect, useState } from "react";
import NewDetailedProduct from "../../../components/element/NewDetailedProduct";
import Layout from "../../../components/Layout";
import styles from "/styles/shop/NewDetailedProduct.module.css";

const CreateProduct = () => {
  const [uniqueId, setUniqueId] = useState();
  const [product, setProduct] = useState({
    _id: "",
    images: [],
    maintainOriginalRatio: "",
    status: "",
    uniqueId: "",
    actualPrice: "",
    category: "",
    desc: "",
    discountPrice: "",
    productSlug: "",
    shortDesc: "",
    title: "",
  });

  useEffect(() => {
    const id = "id" + new Date().getTime();
    setUniqueId(id);
  }, []);
  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.breadCrumb}>
          <Link href={`/shop/products/allProducts`}>Products/</Link>
          <Link className={styles.color} href={"/shop/home"}>
            Create Product
          </Link>
        </div>
        <NewDetailedProduct
          uniqueId={uniqueId}
          product={product}
          edit={false}
        />
      </div>
      ;
    </Layout>
  );
};

export default CreateProduct;
