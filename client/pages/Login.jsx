import React from "react";
import NavbarComp from "../Components/Navbar";
import { MDBInput, MDBCheckbox } from "../Components/Inputs";
import { useMediaQuery } from "../Components/Layout";
import { Container, Col, Row } from "../Components/Layout";
import { useEffect, useState } from "react";
import { MainBtn } from "../Components/Buttons";
import Loading from "../Components/Loading";
import Link from "next/link";
import { useRouter } from "next/router";
import Footer from "../Components/Footer";
const Login = () => {
  const Route = useRouter();
  const [mount, setMount] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const ChangeData = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData({ ...data, [name]: value });
  };
  const SendData = async () => {
    const { email, password } = data;
    if (email && password) {
      const res = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
        withCredentials: true,
      });
      const data = await res.json();
      console.log("This is data ", data);
      if (data.message === "error") {
        alert("Wrong Credentials");
      } else {
        alert("login successful");
        localStorage.setItem("login", JSON.stringify(data));
        Route.push("/User");
      }
    }
  };
  const isResponsive = useMediaQuery({
    query: "(max-width: 753px)",
  });
  const Show = () => {
    setShowPass(!showPass);
  };
  useEffect(() => {
    setMount(true);
  }, []);
  return mount ? (
    <>
      <NavbarComp title="Login" />
      <h1
        className="text-center mb-5"
        style={{ marginTop: "20vh", color: "#183e8f", fontWeight: "600" }}
      >
        Login
      </h1>
      <Container
        className="mt-3 mb-5"
        style={{ width: isResponsive ? "100%" : "40%" }}
      >
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
          <Col md={6} className="text-end">
            <a href="!#">Forgot password?</a>
          </Col>
        </Row>
        <MainBtn onClick={SendData} className="mb-4">
          Login
        </MainBtn>

        <div className="text-center">
          <p>
            Not a member? <Link href="/Signup">Register</Link>
          </p>
        </div>
      </Container>
      <Footer />
    </>
  ) : (
    <>
      <Loading />
    </>
  );
};

export default Login;
