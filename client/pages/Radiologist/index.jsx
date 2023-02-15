import React, { useState, useEffect, useContext } from "react";
import { NavContext } from "../_app";
import Footer from "../../Components/Footer";
import NavbarComp from "../../Components/Navbar";
const Index = () => {
  const [mount, setMount] = useState(false);
  const { NavState, NavDispatch } = useContext(NavContext);
  useEffect(() => {
    const login = localStorage.getItem("login");
    if (!login) {
      setMount(false);
      Router.push("/Login");
    } else {
      setMount(true);
      NavDispatch({ type: "Nav", payload: false });
    }
  }, []);
  return mount ? (
    <>
      <NavbarComp />
      <div style={{ marginTop: "10%" }}>
        <h1>This is Radiologist</h1>
      </div>
      <Footer />
    </>
  ) : (
    <></>
  );
};

export default Index;
