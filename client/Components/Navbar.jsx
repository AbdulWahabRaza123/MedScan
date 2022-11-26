import Head from "next/head";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { ImageComp, Container } from "./Layout";
import styled from "styled-components";
import { useRouter } from "next/router";
import Link from "next/link";
const NavLogoStyle = {
  width: "70px",
  height: "70px",
};
const BorderBottom = styled.div`
  border-bottom: 0.01% solid black;
  -webkit-box-shadow: 0px 4px 3px gray;
  -moz-box-shadow: 0px 4px 3px gray;
  box-shadow: 0px 4px 3px gray;
  position: fixed;
  width: 100%;
`;
const A = styled.a`
  cursor: pointer;
  text-decoration: none;
  color: ${(props) => (props.active ? "#64ebb6" : "#183e8f")};
  border-bottom: ${(props) => (props.active ? "1px solid black" : "")};
  &:hover {
    color: #64ebb6;
  }
`;
const NavLink = styled.p`
  font-style: normal;
  font-weight: 700;
  }
  @media screen and (min-width: 754px) {
    margin-left: 25px;
  }
`;
const NavbarComp = () => {
  const router = useRouter();
  const pages = ["Home", "Services", "About", "Contact", "How to use"];
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <BorderBottom>
        <Navbar bg="white" expand="lg">
          <Container>
            <Navbar.Brand href="/" className="mt-2">
              <ImageComp
                src="/assets/logo.png"
                style={NavLogoStyle}
                fluid={true}
              />
            </Navbar.Brand>
            <Navbar.Toggle
              aria-controls="basic-navbar-nav"
              style={{ color: "#64ebb6" }}
            />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto mt-4">
                {pages.map((name, id) => {
                  console.log(router.pathname);
                  return (
                    <>
                      <NavLink key={id}>
                        <Link
                          href={`/${name === "Home" ? "" : name}`}
                          style={{ textDecoration: "none" }}
                        >
                          <A
                            active={
                              router.pathname === "/" + name
                                ? "active"
                                : router.pathname === "/" && name === "Home"
                                ? "active"
                                : ""
                            }
                          >
                            {name}
                          </A>
                        </Link>
                      </NavLink>
                    </>
                  );
                })}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </BorderBottom>
      <br />
      <br />
    </>
  );
};

export default NavbarComp;
