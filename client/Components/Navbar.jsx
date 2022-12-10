import { useContext, useEffect, useState } from "react";
import Head from "next/head";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { ImageComp, Container } from "./Layout";
import styled from "styled-components";
import { useRouter } from "next/router";
import Link from "next/link";
import HomeIcon from "@mui/icons-material/Home";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import CallIcon from "@mui/icons-material/Call";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import AddIcon from "@mui/icons-material/Add";
import { NavContext } from "../pages/_app";
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
  z-index: 100;
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

const NavbarComp = (props) => {
  const router = useRouter();
  const [mount, setMount] = useState(false);
  const { NavState, NavDispatch } = useContext(NavContext);

  const pages = [
    { name: "Home", icon: HomeIcon },
    { name: "Services", icon: SettingsSuggestIcon },
    { name: "About", icon: AutoAwesomeIcon },
    { name: "Contact", icon: CallIcon },
    { name: "Login", icon: LockOpenIcon },
    { name: "Signup", icon: AddIcon },
  ];
  const pagesUser = [
    { name: "Home", icon: HomeIcon },
    { name: "Services", icon: SettingsSuggestIcon },
    { name: "About", icon: AutoAwesomeIcon },
    { name: "Contact", icon: CallIcon },
    { name: "Profile", icon: LockOpenIcon },
    { name: "Logout", icon: LockOpenIcon },
  ];
  useEffect(() => {
    setMount(true);
  }, [NavState]);
  return mount ? (
    <>
      <Head>
        <title>{props.title}</title>
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
                {NavState
                  ? pages.map((name, id) => {
                      return (
                        <>
                          <NavLink key={id}>
                            <Link
                              href={`/${name.name === "Home" ? "" : name.name}`}
                              style={{ textDecoration: "none" }}
                            >
                              <A
                                active={
                                  router.pathname === "/" + name.name
                                    ? "active"
                                    : router.pathname === "/" &&
                                      name.name === "Home"
                                    ? "active"
                                    : ""
                                }
                              >
                                <name.icon
                                  style={{
                                    marginTop: "-6px",
                                  }}
                                />
                                {name.name}
                              </A>
                            </Link>
                          </NavLink>
                        </>
                      );
                    })
                  : pagesUser.map((name, id) => {
                      return (
                        <>
                          <NavLink key={id}>
                            <Link
                              href={`/${name.name === "Home" ? "" : name.name}`}
                              style={{ textDecoration: "none" }}
                            >
                              <A
                                active={
                                  router.pathname === "/" + name.name
                                    ? "active"
                                    : router.pathname === "/" &&
                                      name.name === "Home"
                                    ? "active"
                                    : ""
                                }
                              >
                                <name.icon
                                  style={{
                                    marginTop: "-6px",
                                  }}
                                />
                                {name.name}
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
  ) : (
    <></>
  );
};

export default NavbarComp;
