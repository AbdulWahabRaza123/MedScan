import React, { useState, useEffect, useContext } from "react";
import { useRouter,useLocation } from "next/router";
import NavbarComp from "../../Components/Navbar";
import Footer from "../../Components/Footer";
import { NavContext } from "../_app";
import { Carousel } from "react-responsive-carousel";
import { Container, Row, Col, Wrapper } from "../../Components/Layout";
import { BtnProfile } from "../../Components/Buttons";
import CardComp from "../../Components/Card";
import Loading from "../../Components/Loading";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import styles from "styled-components";
const CarouselStyle = styles.span` 

`;
const CeroselData=[
    "assets/banner3.jpg",
    "assets/banner2.jpg",
    "assets/banner1.jpg"
]
const ImageStyle = {
  width: "100%",
  border: "1px solid black",
};
const Index = () => {
  const Router = useRouter();
  const [mount, setMount] = useState(false);
  const [data,setData]=useState(null);
  const { NavState, NavDispatch } = useContext(NavContext);
  const authUser = async () => {
    const res = await fetch("/authUser", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      
      credentials: "include",
    });
    const data = await res.json();
    if (data.message === "done") {
   
    } else {
     console.log("Data not found");
    }
  };
  useEffect(() => {
    async function verifyUser() {
    // authUser();
    const login = localStorage.getItem("login");
    if (!login) {
      setMount(false);
      Router.push("/Login");
    } else {
      const info=await JSON.parse(login);
    setData(info);
      setMount(true);
      NavDispatch({ type: "Nav", payload: "user" });
    
    }
  }
  verifyUser();
  }, []);
  return mount ? (
    <>
      <NavbarComp name={data.name}/>
      <Container style={{ marginTop: "20vh" }}>
        <Row className="pb-5">
          <Col sm={6} md={6}>
            <CarouselStyle className="text-center">
              <Carousel
                dynamicHeight={false}
                autoplay={true}
                infiniteLoop={true}
                showStatus={false}
                showArrows={false}
                showThumbs={false}
              >
              {
                CeroselData.map((val,index)=>{
                  return( 
                    <>
                    <div key={index}>
                  <img
                    style={{ borderRadius: "25px" }}
                    src={val}
                  />
                </div>
                    </>
                  )
                })
              }
             
              </Carousel>
            </CarouselStyle>
          </Col>
          <Col sm={6} md={6} className="mt-4">
            <h1>Hello, {data.name}</h1>
            <p style={{ color: "gray" }}>Nice to Meet you!</p>
            <BtnProfile>Docs</BtnProfile>
          </Col>
        </Row>
        <hr className="mt-1" />
        <Wrapper className="mt-4 mb-5">
          <h2 className="text-center text-bold">Services</h2>
          <Wrapper className="d-flex flex-row mt-5">
            <CardComp mode="user" data={data}/>
          </Wrapper>
        </Wrapper>
      </Container>
      <Footer />
    </>
  ) : (
    <>
      <Loading />
    </>
  );
};

export default Index;
