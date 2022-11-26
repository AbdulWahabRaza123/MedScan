import NavbarComp from "../Components/Navbar";
import { useState, useEffect } from "react";

const index = () => {
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

export default index;
