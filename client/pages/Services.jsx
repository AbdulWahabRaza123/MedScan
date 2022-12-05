import React from "react";
import NavbarComp from "../Components/Navbar";
import { useState, useEffect } from "react";
import styled from "styled-components";
import CardComp from "../Components/Card";
import { Container, Row, Col } from "../Components/Layout";
import Footer from "../Components/Footer";
const Services = () => {
  const [mount, setMount] = useState(false);
  useEffect(() => {
    setMount(true);
  }, []);
  const ServicesStyle = styled.div`
    margin-top: 18vh;
    margin-bottom: 5%;
    }
  `;
  return mount ? (
    <>
      <NavbarComp title="Services" />
      <Container>
        <ServicesStyle>
          <Row>
            <Col md={4}>
              <CardComp />
            </Col>
          </Row>
        </ServicesStyle>
      </Container>
      <Footer />
    </>
  ) : (
    <></>
  );
};

export default Services;
