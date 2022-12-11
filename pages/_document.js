import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
  return (
    <Html>
      <Head>
        <link
          href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
          rel="stylesheet"
          as="font"
        />
      </Head>
      <script defer src="/static/js/header.js"></script>
      <script defer src="/static/js/notes.js"></script>
      <script defer src="/static/js/refresh.js"></script>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
