import { useContext, useEffect, useState } from "react";
import Head from "next/head";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { ImageComp, Container } from "./Layout";
import styled from "styled-components";
import { useRouter } from "next/router";
import Link from "next/link";
import { useMediaQuery } from "react-responsive";
// Icons
import HomeIcon from "@mui/icons-material/Home";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import CallIcon from "@mui/icons-material/Call";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import Badge from "@mui/material/Badge";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";

import { NavContext } from "../pages/_app";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
// import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";

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
const pages = [
  { name: "Home", icon: HomeIcon },
  { name: "Services", icon: SettingsSuggestIcon },
  { name: "About", icon: AutoAwesomeIcon },
  { name: "Contact", icon: CallIcon },
  { name: "Login", icon: LockOpenIcon },
  { name: "Signup", icon: AddIcon },
];
const settings = [
  { name: "Profile", path: "/User" },
  { name: "Account", path: "/User/Account" },
  { name: "Dashboard", path: "/User/Dashboard" },
  { name: "Logout", path: "/User/Logout" },
];
function notificationsLabel(count) {
  if (count === 0) {
    return "no notifications";
  }
  if (count > 99) {
    return "more than 99 notifications";
  }
  return `${count} notifications`;
}
const NavbarComp = (props) => {
  const router = useRouter();
  const isResponsive = useMediaQuery({
    query: "(max-device-width: 768px)",
  });
  const [mount, setMount] = useState(false);
  const { NavState, NavDispatch } = useContext(NavContext);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [notifyRes, setNotifyRes] = useState(false);
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
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
            <span>
              {isResponsive ? (
                <Tooltip title="Notifications">
                  <IconButton
                    aria-label={notificationsLabel(100)}
                    className="me-3"
                    style={{ marginTop: isResponsive ? "6px" : "" }}
                  >
                    <Badge badgeContent={10} color="primary">
                      <NotificationsNoneIcon style={{ color: "#183e8f" }} />
                    </Badge>
                  </IconButton>
                </Tooltip>
              ) : (
                <></>
              )}

              <Navbar.Toggle
                aria-controls="basic-navbar-nav"
                style={{ color: "#64ebb6" }}
              />
            </span>
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto mt-4">
                {NavState==="simple" ? (
                  pages.map((name, id) => {
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
                ) : (
                  <>
                    {/* Notifications  */}
                    {!isResponsive ? (
                      <Tooltip title="Notifications">
                        <IconButton
                          aria-label={notificationsLabel(100)}
                          style={{ marginTop: isResponsive ? "" : "5px" }}
                        >
                          <Badge badgeContent={10} color="primary">
                            <NotificationsNoneIcon
                              style={{ color: "#183e8f", fontSize: "21px" }}
                            />
                          </Badge>
                        </IconButton>
                      </Tooltip>
                    ) : (
                      <></>
                    )}
                    {/* Services  */}
                    <NavLink
                      style={{ marginLeft: isResponsive ? "6.5px" : "" }}
                    >
                      <Link
                        href="/Services"
                        style={{
                          textDecoration: "none",
                          borderBottom: "none",
                        }}
                      >
                        <A
                          active={
                            router.pathname === "/" + "Services" ? "active" : ""
                          }
                        >
                          <Tooltip title="Services">
                            <MedicalServicesIcon
                              style={{ marginTop: "8px", fontSize: "27px" }}
                            />
                          </Tooltip>
                        </A>
                      </Link>
                    </NavLink>
                    {/* Profile  */}
                    {!isResponsive ? (
                      <span
                        style={{
                          fontWeight: "500",
                          marginTop: "15px",
                          marginRight: "-22px",
                          marginLeft: "20px",
                        }}
                      >
                        Abdul Wahab Raza
                      </span>
                    ) : (
                      <></>
                    )}
                    <Box
                      sx={{ flexGrow: 0 }}
                      className={isResponsive ? "" : "ms-4"}
                      style={{ marginTop: isResponsive ? "" : "0px" }}
                    >
                      <Tooltip title="Open settings">
                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                          <Avatar alt="Remy Sharp" src="/assets/profile.jpg" />
                        </IconButton>
                      </Tooltip>
                      <Menu
                        sx={{ mt: "45px" }}
                        id="menu-appbar"
                        anchorEl={anchorElUser}
                        anchorOrigin={{
                          vertical: "top",
                          horizontal: "right",
                        }}
                        keepMounted
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "right",
                        }}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                      >
                        {settings.map((setting) => (
                          <MenuItem
                            key={setting}
                            onClick={() => {
                              handleCloseUserMenu();
                              router.push(setting.path);
                            }}
                          >
                            <Typography textAlign="center">
                              {setting.name}
                            </Typography>
                          </MenuItem>
                        ))}
                      </Menu>
                    </Box>
                  </>
                )}
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
