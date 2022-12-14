import React, { useEffect } from "react";
import Layout from "../../components/Layout";
import HomeSection from "../../components/shopSections/HomeSection";
import CategorySection from "../../components/shopSections/CategorySection";
import { useState } from "react";
import { useSelector } from "react-redux";
import LoginSection from "../../components/sections/LoginSection";
import Head from "next/head";

const Home = (props) => {
  const formState = useSelector((state) => state.formSlice);
  const [isVisible, setIsVisible] = useState();

  useEffect(() => {
    setIsVisible(formState.form);
  }, [formState]);

  return (
    <Layout>
      <Head>
        <title>whitehawk academy model town</title>
      </Head>
      <HomeSection />
      <CategorySection categories={props.categories} />
      {isVisible && isVisible.visible && (
        <LoginSection login={isVisible.login} />
      )}
    </Layout>
  );
};

export default Home;

export async function getServerSideProps(context) {
  const data = await fetch(`${process.env.BASE_URL}/api/shop/category`, {
    method: "GET",
  });
  const dbData = await data.json();
  if (!dbData.err) {
    return {
      props: { categories: dbData.data }, // will be passed to the page component as props
    };
  }
  if (dbData.err) {
    return {
      props: { categories: {} }, // will be passed to the page component as props
    };
  }
}
