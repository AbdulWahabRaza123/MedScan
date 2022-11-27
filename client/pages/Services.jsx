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
      <NavbarComp title="Services" />
      {/* <h1>Hello World</h1>
      <NavbarComp/> */}
    </>
  ) : (
    <></>
  );
};

export default Services;
