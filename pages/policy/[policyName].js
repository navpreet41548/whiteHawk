import React from "react";
import styles from "/styles/Policy.module.css";
import Layout from "/components/Layout";
import PolicyMessage from "../../components/element/PolicyMessage";

const Policy = (props) => {
  return (
    <Layout>
      <div className={styles.container}>
        <PolicyMessage policy={props.policy} />
      </div>
    </Layout>
  );
};

export default Policy;

export async function getServerSideProps(context) {
  const policy = context.query.policyName;
  return {
    props: { policy }, // will be passed to the page component as props
  };
}
