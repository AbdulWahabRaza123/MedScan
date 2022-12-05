import React, { useState, useEffect } from "react";
import NavbarComp from "../Components/Navbar";
import styled from "styled-components";
import { Container, Row, Col } from "../Components/Layout";
import { RegistrationLoginBtn } from "../Components/Buttons";
const Signup = () => {
  const [mount, setMount] = useState(false);
  useEffect(() => {
    setMount(true);
  }, []);
  return mount ? (
    <>
      <NavbarComp title="Signup" />
      <Container style={{ marginTop: "15vh" }}>
        <Row>
          <Col md={4} style={{ marginTop: "15vh" }}>
            <h1>Welcome To Here</h1>
            <h3>Do Registration</h3>
            <p style={{ color: "gray" }}>
              After Registration you can easily get the report from your
              radiologist{" "}
            </p>
            <RegistrationLoginBtn>Login</RegistrationLoginBtn>
          </Col>
          <Col md={8}></Col>
        </Row>
      </Container>
    </>
  ) : (
    <></>
  );
};

export default Signup;
