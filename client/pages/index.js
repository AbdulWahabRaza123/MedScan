import NavbarComp from "../Components/Navbar";
import { useState, useEffect } from "react";

const Home = () => {
  const [mount, setMount] = useState(false);
  useEffect(() => {
    setMount(true);
  }, []);
  return mount ? (
    <>
      <NavbarComp />

      <h1>Hello World</h1>
      <br />
      <h1>Hello World</h1>
      <br />
      <h1>Hello World</h1>
      <br />
      <h1>Hello World</h1>
      <br />
      <h1>Hello World</h1>
      <br />
      <h1>Hello World</h1>
      <br />
      <h1>Hello World</h1>
      <br />
      <h1>Hello World</h1>
      <br />
      <h1>Hello World</h1>
      <br />
      <h1>Hello World</h1>
      <br />
      <h1>Hello World</h1>
      <br />
      <h1>Hello World</h1>
    </>
  ) : (
    <></>
  );
};

export default Home;
