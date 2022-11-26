import Head from "next/head";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { ImageComp } from "./Layout";
const NavbarComp = () => {
  const NavLogoStyle = {
    width: "100px",
    height: "100px",
  };
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <Navbar bg="white" expand="lg" className="ms-3 me-4">
        <Navbar.Brand href="#home" className="mt-2">
          <ImageComp src="/assets/logo.png" style={NavLogoStyle} fluid={true} />
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          style={{ color: "#64ebb6" }}
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto mt-1">
            <Nav.Link href="#home" className="ms-2">
              Home
            </Nav.Link>
            <Nav.Link href="#link" className="ms-2">
              Services
            </Nav.Link>
            <Nav.Link href="#home" className="ms-2">
              About
            </Nav.Link>
            <Nav.Link href="#link" className="ms-2">
              Contact
            </Nav.Link>
            <Nav.Link href="#link" className="ms-2">
              How to use?
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default NavbarComp;
