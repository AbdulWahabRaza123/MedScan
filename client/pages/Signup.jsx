import React, { useState, useEffect } from "react";
import NavbarComp from "../Components/Navbar";
import { MDBInput, MDBCheckbox } from "../Components/Inputs";
import { Container, Row, Col } from "../Components/Layout";
import { RegistrationLoginBtn } from "../Components/Buttons";
import { MainBtn } from "../Components/Buttons";
import { useMediaQuery } from "../Components/Layout";
import Loading from "../Components/Loading";
import { useRouter } from "next/router";
import Footer from "../Components/Footer";
const Signup = () => {
  const Route = useRouter();
  const [mount, setMount] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    cPassword: "",
  });
  const ChangeData = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData({ ...data, [name]: value });
  };
  const Show = () => {
    setShowPass(!showPass);
  };
  const isResponsive = useMediaQuery({
    query: "(max-width: 753px)",
  });
  const PostDataRegister = async (event) => {
    // event.preventDefault();
    const { name, email, password, cPassword } = data;
    if (name && email && password && cPassword) {
      const res = await fetch("http://localhost:8000/registerPatient", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          cPassword,
        }),
      });
      const data = await res.json();
      if (data.message === "error") {
        alert("Wrong Credentials");
      } else {
        alert("signup successful");
        Route.push("/Login");
      }
    }
  };
  useEffect(() => {
    setMount(true);
  }, []);
  return mount ? (
    <>
      <NavbarComp title="Signup" />
      <Container style={{ marginTop: "15vh" }}>
        <Row>
          <Col
            md={4}
            style={{
              marginTop: isResponsive ? "5vh" : "25vh",
              marginBottom: "10vh",
            }}
          >
            <span>
              <h1 style={{ color: "#183e8f", fontWeight: "700" }}>
                Welcome To Here
              </h1>
              <h3 style={{ color: "#183e8f" }}>Do Registration</h3>
            </span>
            <p style={{ color: "gray" }}>
              After Registration you can easily get the report from your
              radiologist{" "}
            </p>
            <RegistrationLoginBtn>Login</RegistrationLoginBtn>
          </Col>
          <Col
            md={{ offset: 1 }}
            className="text-center"
            style={{
              borderRadius: "15px",
              boxShadow: "5px 5px 10px gray",
            }}
          >
            <h1
              className="text-center mb-5"
              style={{
                marginTop: "1vh",
                color: "#183e8f",
                fontWeight: "600",
              }}
            >
              Signup
            </h1>
            <Container
              className="mt-3 mb-5"
              style={{ width: isResponsive ? "100%" : "70%" }}
            >
              <MDBInput
                wrapperClass="mb-4"
                id="form1"
                type="name"
                name="name"
                onChange={ChangeData}
                value={data.name}
                placeholder="Enter Name"
              />
              <MDBInput
                wrapperClass="mb-4"
                id="form1"
                type="email"
                name="email"
                onChange={ChangeData}
                value={data.email}
                placeholder="Enter Email"
              />
              <MDBInput
                wrapperClass="mb-4"
                id="form2"
                name="password"
                onChange={ChangeData}
                value={data.password}
                type={showPass ? "name" : "password"}
                placeholder="Enter Password"
              />
              <MDBInput
                wrapperClass="mb-4"
                id="form2"
                name="cPassword"
                onChange={ChangeData}
                value={data.cPassword}
                type={showPass ? "name" : "password"}
                placeholder="Confirm Password"
              />

              <Row
                className="mb-4"
                style={{
                  justifyContent: "space-between",
                }}
              >
                <Col md={6} className="text-start">
                  <MDBCheckbox
                    name="flexCheck"
                    value=""
                    id="flexCheckDefault"
                    label="Show Password"
                    onChange={Show}
                  />
                </Col>
              </Row>
              <MainBtn className="mb-4" onClick={PostDataRegister}>
                Signup
              </MainBtn>
            </Container>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  ) : (
    <>
      {" "}
      <Loading />
    </>
  );
};

export default Signup;
