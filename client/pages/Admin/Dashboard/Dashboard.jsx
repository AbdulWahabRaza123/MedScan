import React, { useState, useEffect, useContext } from "react";
import { NavContext } from "../../_app";
import NavbarComp from "../../../Components/Navbar";
import { useRouter } from "next/router";
import { Spacer } from "../../../Components/Spacer";
import { Container,Wrapper,Row,Col,LinkP,useMediaQuery } from "../../../Components/Layout";
import { P } from "../../../Components/Typography";
import { MDBInput, MDBCheckbox } from "../../../Components/Inputs";
import { MainBtn } from "../../../Components/Buttons";
import Footer from "../../../Components/Footer";
import Loading from "../../../Components/Loading";
import styled from "styled-components";
const SideMenu=[
  "Radiologist Info",
  "Personal Info",
  "Additional Info",
  "Report Info",
  "Patient Info",
  "Settings"
]
const MenuItem=styled(LinkP)`
margin-left:${(props)=>{props.ml?props.ml:""}}
&:hover{
  background:gray;
}
`;
const Dashboard = () => {
  const Router=useRouter();
  const [mount, setMount] = useState(false);
  const { NavState, NavDispatch } = useContext(NavContext);
  const [showPass, setShowPass] = useState(false);
  const [data, setData] = useState({
    name: "",
    email: "",
    specialization:"",
    password: "",
    cPassword: "",
  });
  const isResponsive = useMediaQuery({
    query: "(max-width: 753px)",
  });
  const Show = () => {
    setShowPass(!showPass);
  };
  const [active,setActive]=useState(0);
  const ChangeData = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData({ ...data, [name]: value });
  };
  const RegisterRadiologist=async()=>{
    const { name, email,specialization, password, cPassword } = data;
    if (name && email&&specialization && password && cPassword) {
      const res = await fetch("/registerRadiologist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          specialization,
          password,
          cPassword,
        }),
      });
      const data = await res.json();
      if (data.message === "error") {
        alert("Wrong Credentials");
      } else {
        alert("signup successful");
       
      }
    }
  }
  useEffect(() => {
    const login = localStorage.getItem("login");
    if (!login) {
      setMount(false);
      Router.push("/Login");
    } else {
      setMount(true);
      NavDispatch({ type: "Nav", payload: "admin" });
    }
  }, []);
  return mount ? (
    <>
      <NavbarComp />
      <Container style={{marginTop:"10vh"}}>
     <Row>
      <Col md={3} lg={3} style={{borderRight:"1px solid black"}}>
      <Spacer height="15vh"/>
       <Wrapper className="d-flex flex-column">
       <hr style={{border:"1px solid black",width:"105%",height:"1px"}}/>
       {
        SideMenu.map((val,index)=>{
          return(
            <>          
       <Wrapper width="105%" key={index} onClick={()=>{
        setActive(index);
       }}>
       <MenuItem className={index===active?"mb-0 ms-4":"mb-0"} weight="600" size="18px">{index===active?"-":""} {val}</MenuItem>
       <hr style={{border:"1px solid black"}}/>
       </Wrapper>
            </>
          )
        })
       }
       <Spacer height="10vh"/>
       </Wrapper>
      </Col>
      <Col md={9} lg={9}>
      {
        active===0?  <Wrapper>
        <Container
              className="mt-3 mb-5"
              style={{ width: isResponsive ? "100%" : "70%" }}
            >
            <Spacer height="10vh"/>
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
                id="form1"
                type="text"
                name="specialization"
                onChange={ChangeData}
                value={data.specialization}
                placeholder="Specialization"
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
              <MainBtn className="mb-4" onClick={RegisterRadiologist}>
                Register Radiologist
              </MainBtn>
            </Container>

        </Wrapper>:null
      }
      
      </Col>
     </Row>
      </Container>

      <Footer />
    </>
  ) : (
    <>
      <Loading />
    </>
  );
};

export default Dashboard;
