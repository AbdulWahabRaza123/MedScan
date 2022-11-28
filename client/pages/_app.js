import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
