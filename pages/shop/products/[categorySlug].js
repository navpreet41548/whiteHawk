import Link from "next/link";
import React from "react";
import ProductElement from "../../../components/element/ProductElement";
import Layout from "../../../components/Layout";
import styles from "../../../styles/shop/ProductSection.module.css";
import EmptyMessage from "../../../components/element/EmptyMessage";

const productSection = (props) => {
  return (
    <Layout>
      <div className={styles.container}>
        <p className={styles.breadCrumb}>
          <Link href={"/shop/home"}>Shop/Products</Link>
          <Link
            className={styles.current}
            href={`/shop/products/${props.categorySlug}`}
          >
            /{props.categorySlug}
          </Link>
        </p>
        {props.products.length !== 0 ? (
          <div className={styles.productWrapper}>
            {props.products &&
              props.products.map((item, i) => (
                <ProductElement
                  key={i}
                  imageSrc="shop1.jpg"
                  product={item}
                  cart={false}
                  wishlist={false}
                />
              ))}
          </div>
        ) : (
          <div className={styles.productWrapper}>
            <EmptyMessage
              imageName={"emptyWishlist.png"}
              message={"No Product Found"}
            />
          </div>
        )}
      </div>
    </Layout>
  );
};

export default productSection;

export async function getServerSideProps(context) {
  const categorySlug = context.query.categorySlug;
  if (categorySlug.split(/(?=[A-Z])/)[0] == "search") {
    let products = [];
    const tagArr = categorySlug.split(/(?=[A-Z])/);
    const data = await fetch(
      `${process.env.BASE_URL}/api/shop/product/allProduct`
    );
    const dbData = await data.json();
    for (let i = 0; i < dbData.data.length; i++) {
      const element1 = dbData.data[i];
      if (element1.tag) {
        const dbTag = element1.tag.split(" ");
        console.log(dbTag);
        for (let l = 0; l < dbTag.length; l++) {
          const element2 = dbTag[l].toLowerCase();
          for (let k = 0; k < tagArr.length; k++) {
            const element3 = tagArr[k].toLowerCase();
            if (element3 == element2) {
              products.push(element1);
            }
          }
        }
      }
      // for (let j = 0; j < tagArr.length; j++) {
      //   const element2 = tagArr[j];
      //   if (element2 == dbTag) {
      //     products.push(element1);
      //   }
      // }
    }
    console.log(products);

    products = products.filter(
      (value, index, self) =>
        index === self.findIndex((t) => t.uniqueId === value.uniqueId)
    );

    return {
      props: { products: products, categorySlug }, // will be passed to the page component as props
    };
  } else {
    const data = await fetch(
      `${process.env.BASE_URL}/api/shop/product/productsByCate/${categorySlug}`
    );
    const dbData = await data.json();
    return {
      props: { products: dbData.data, categorySlug }, // will be passed to the page component as props
    };
  }
  // console.log(categorySlug.split(/(?=[A-Z])/));
}
