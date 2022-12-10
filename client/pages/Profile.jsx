import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import NavbarComp from "../Components/Navbar";
import Footer from "../Components/Footer";
import { NavContext } from "../pages/_app";
import { Container, Row, Col } from "../Components/Layout";
const Profile = () => {
  const Router = useRouter();
  const [mount, setMount] = useState(false);
  const [login, setLogin] = useState(false);
  const { NavState, NavDispatch } = useContext(NavContext);
  useEffect(() => {
    setMount(true);
    const login = localStorage.getItem("login");
    if (!login) {
      setLogin(false);
      Router.push("/Login");
    } else {
      setLogin(true);
      NavDispatch({ type: "Nav", payload: false });
    }
  }, []);
  return mount && login ? (
    <>
      <NavbarComp />
      <Container style={{ marginTop: "15vh" }}>
        <h1>Hello</h1>
      </Container>
      <Footer />
    </>
  ) : (
    <></>
  );
};

export default Profile;
