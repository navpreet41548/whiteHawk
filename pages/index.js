import Head from "next/head";
import Script from "next/script";
import Image from "next/image";
import Layout from "../components/Layout";
import styles from "../styles/Home.module.css";
import HomeSection from "../components/sections/HomeSection";
import AboutSection from "../components/sections/AboutSection";
import TeamSection from "../components/sections/TeamSection";
import NotesSection from "../components/sections/NotesSection";
import Footer from "../components/Footer";
import LoginSection from "../components/sections/LoginSection";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

export default function Home() {
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
      <div className={styles.wrapper}>
        <HomeSection />
        <AboutSection />
        <TeamSection />
        <NotesSection />
        {isVisible && isVisible.visible && (
          <LoginSection login={isVisible.login} />
        )}
      </div>
    </Layout>
  );
}
