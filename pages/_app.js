import "../styles/globals.css";
import "../utils/slider.css";
import { wrapper } from "../store/store";

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default wrapper.withRedux(MyApp);
