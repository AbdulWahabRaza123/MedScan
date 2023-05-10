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
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
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
      
      if (data.message === "error") {
        // alert("Wrong Credentials");
        toast.error("Error!", {
          className: "set_notify",
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
      
            const store=JSON.stringify({
                id:data.data._id,
                name:data.data.name,
                email:data.data.email,
                mode:data.mode,
                token:data.token 
            });
        if(data.mode==="user"){
          // alert("User login successful");
          toast.success("User login successfully!", {
            className: "set_notify",
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          localStorage.setItem("login", store);
          Route.push("/User");
        }
        else if(data.mode==="radiologist"){
          toast.success("Radiologist login successfully!", {
            className: "set_notify",
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          localStorage.setItem("login", store);
          Route.push("/Radiologist");
        }
        else if(data.mode==="admin"){
        // alert("Admin login successful");
        toast.success("Admin login successfully!", {
          className: "set_notify",
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        localStorage.setItem("login",store);
        Route.push("/Admin");
        }
        
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
      <ToastContainer
        className="set_notify"
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
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
