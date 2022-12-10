import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
// import "mdbreact/dist/css/mdb.css";
// import "@fortawesome/fontawesome-free/css/all.min.css";
import { useReducer, createContext } from "react";
import { NavReducer, initialStateNav } from "../Components/Reducer/NavReducer";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
const NavContext = createContext();
function MyApp({ Component, pageProps }) {
  const [NavState, NavDispatch] = useReducer(NavReducer, initialStateNav);

  return (
    <>
      <NavContext.Provider value={{ NavState, NavDispatch }}>
        <Component {...pageProps} />
      </NavContext.Provider>
    </>
  );
}
export { NavContext };
export default MyApp;
