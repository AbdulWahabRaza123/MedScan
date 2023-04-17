import React, { useState, useEffect, useContext } from "react";
import { NavContext } from "../_app";
import { Container, Row, Col, Wrapper } from "../../Components/Layout";
import Footer from "../../Components/Footer";
import NavbarComp from "../../Components/Navbar";
import { Carousel } from "react-responsive-carousel";
import { BtnProfile } from "../../Components/Buttons";
import CardComp,{StepsCard} from "../../Components/Card";
import Loading from "../../Components/Loading";
import styles from "styled-components";
import { useRouter } from "next/router";
import { Spacer } from "../../Components/Spacer";
const CarouselStyle = styles.span` 

`;
const ImageStyle = {
  width: "100%",
  border: "1px solid black",
};
const Index = () => {
  const [mount, setMount] = useState(false);
  const [data,setData]=useState(null);
  const Router=useRouter();
  const { NavState, NavDispatch } = useContext(NavContext);
  useEffect(() => {
    async function VerifyAdmin(){
    const login = localStorage.getItem("login");
    if (!login) {
      setMount(false);
      Router.push("/Login");
    } else {
      const info=await JSON.parse(login);
      setData(info);
      setMount(true);
      NavDispatch({ type: "Nav", payload: "admin" });
    }
  }
  VerifyAdmin();
  }, []);
  return mount ? (
    <>
      <NavbarComp />
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
                <div>
                  <img
                    style={{ borderRadius: "25px" }}
                    src="assets/banner3.jpg"
                  />
                </div>
                <div>
                  <img
                    style={{ borderRadius: "25px" }}
                    src="assets/banner2.jpg"
                  />
                </div>
                <div>
                  <img
                    style={{ borderRadius: "25px" }}
                    src="assets/banner1.jpg"
                  />
                </div>
              </Carousel>
            </CarouselStyle>
          </Col>
          <Col sm={6} md={6} className="mt-4">
            <h1>Hello, Abdul Wahab Raza</h1>
            <p style={{ color: "gray" }}>Nice to Meet you!</p>
            <BtnProfile>Docs</BtnProfile>
          </Col>
        </Row>
        <hr className="mt-1" />
        <Wrapper className="mt-4 mb-5">
          <h2 className="text-center text-bold">Services</h2>
          <Wrapper className="d-flex flex-row mt-5">
            <CardComp mode="admin" data={data}>
            <Spacer height="10vh" />
              <div>
                <Row className="d-flex flex-column ">
                  {/* <H5>Radiologists</H5> */}
                  <Row>
                    {[0, 1, 2, 3, 4].map((val, index) => {
                      return (
                        <>
                          <Col md={4}>
                            <Wrapper className="d-flex flex-row">
                              <StepsCard
                                mode="admin_report_gen"
                                title="Abdul Wahab Raza"
                                description="New sensation"
                              />
                            </Wrapper>
                          </Col>
                        </>
                      );
                    })}
                  </Row>
                </Row>
              </div>
            </CardComp>
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
