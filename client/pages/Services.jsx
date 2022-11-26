import React from "react";
import NavbarComp from "../Components/Navbar";
import { useState, useEffect } from "react";
const Services = () => {
  const [mount, setMount] = useState(false);
  useEffect(() => {
    setMount(true);
  }, []);
  return mount ? (
    <>
      <NavbarComp />
    </>
  ) : (
    <></>
  );
};

export default Services;
