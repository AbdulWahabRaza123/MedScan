import React from "react";
import { Row, Col, Container } from "./Layout";
import styled from "styled-components";
import Link from "next/link";
import { useRouter } from "next/router";
import HomeIcon from "@mui/icons-material/Home";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import CallIcon from "@mui/icons-material/Call";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import YouTubeIcon from "@mui/icons-material/YouTube";
const BorderTop = styled.div`
  position: relative;
  bottom: 0;
  border-top: 0.01px solid black;
  -webkit-box-shadow: 0px -4px 3px rgba(50, 50, 50, 0.75);
  -moz-box-shadow: 0px -4px 3px rgba(50, 50, 50, 0.75);
  box-shadow: 0px -4px 3px rgba(50, 50, 50, 0.75);
  background-color: #27262c;
  color: white;
  font-weight: 700;
`;
const Block = styled.div`
  display: flex;
  justify-content: space-between;
`;
const LinksStyle = styled.div`
  margin-top: 20px;
`;
const A = styled.a`
  cursor: pointer;
  text-decoration: none;
  color: #b9b1d3;
  &:hover {
    color: #64ebb6;
  }
`;
const FooterLink = styled.p`
  font-style: normal;
  font-weight: 700;

  }
  @media screen and (min-width: 754px) {
    margin-left: 25px;
  }
`;
// const Relative = styled.div`
//   position: relative;
// `;
const FooterIcon = styled.div`
  display: flex;
  flex-direction: row;
`;
const Footer = () => {
  const router = useRouter();
  const pages = [
    { name: "Home", icon: HomeIcon },
    { name: "Services", icon: SettingsSuggestIcon },
    { name: "About", icon: AutoAwesomeIcon },
    { name: "Contact", icon: CallIcon },
  ];
  const Icons = [
    {
      icon: FacebookIcon,
      ref: "#facebook",
    },
    {
      icon: InstagramIcon,
      ref: "#instagram",
    },
    {
      icon: TwitterIcon,
      ref: "twitter",
    },
    {
      icon: YouTubeIcon,
      ref: "#youtube",
    },
  ];
  return (
    <>
      <br />
      <br />
      <BorderTop>
        <Container>
          <LinksStyle>
            <Row>
              <Col md={6}>
                {pages.map((name, id) => {
                  console.log(router.pathname);
                  return (
                    <>
                      <FooterLink key={id}>
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
                      </FooterLink>
                    </>
                  );
                })}
              </Col>
            </Row>
          </LinksStyle>
          <hr />
          <Block>
            <p>All Right Reserved&copy;</p>
            <FooterIcon>
              {Icons.map((icon, id) => {
                return (
                  <>
                    <Link
                      href={icon.ref}
                      style={{ textDecoration: "none", marginRight: "7px" }}
                      key={id}
                    >
                      <A>
                        <icon.icon />
                      </A>
                    </Link>
                  </>
                );
              })}
            </FooterIcon>
          </Block>
        </Container>
      </BorderTop>
    </>
  );
};

export default Footer;
