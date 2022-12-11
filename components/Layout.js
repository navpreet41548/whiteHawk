import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import NextNProgress from "nextjs-progressbar";

const Layout = ({ children }) => {
  return (
    <React.Fragment>
      <NextNProgress height={3} color="#ff5b25" />
      <Header />
      {children}
      <Footer />
    </React.Fragment>
  );
};

export default Layout;

// export async function getServerSideProps(context) {
//   const token = context.req.cookies.token;
//   const data = await fetch(`${process.env.BASE_URL}/api/auth/verify`, {
//     method: "GET",
//     headers: {
//       token,
//     },
//   });
//   console.log(data);
//   return {
//     props: { products }, // will be passed to the page component as props
//   };
// }
