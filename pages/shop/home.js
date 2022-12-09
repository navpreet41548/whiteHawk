import React, { useEffect } from "react";
import Layout from "../../components/Layout";
import HomeSection from "../../components/shopSections/HomeSection";
import CategorySection from "../../components/shopSections/CategorySection";
import { useState } from "react";
import { useSelector } from "react-redux";
import LoginSection from "../../components/sections/LoginSection";

const Home = (props) => {
  const formState = useSelector((state) => state.formSlice);
  const [isVisible, setIsVisible] = useState();

  useEffect(() => {
    setIsVisible(formState.form);
  }, [formState]);

  return (
    <Layout>
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
  return {
    props: { categories: dbData.data }, // will be passed to the page component as props
  };
}
