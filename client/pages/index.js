import NavbarComp from "../Components/Navbar";
import { useState, useEffect } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import styles from "styled-components";
import { Container, Row, Col } from "../Components/Layout";
const CarouselStyle = styles.div` 
margin-top:10%;
display:flex;
flex-direction:row;
justify-content:space-between;
text-align:center;
margin-bottom:8%;
@media screen and (max-width: 754px) {
  margin-top:25%;

`;
const Home = () => {
  const [mount, setMount] = useState(false);
  useEffect(() => {
    setMount(true);
  }, []);
  return mount ? (
    <>
      <NavbarComp title="Home" />
      <Container>
        <CarouselStyle>
          <Row>
            <Col md={6}>
              <Carousel
                autoFocus={true}
                interval={10}
                autoplay={true}
                axis={"horizontal"}
                infiniteLoop={true}
                showStatus={false}
                showArrows={false}
                showThumbs={false}
              >
                <img src="assets/banner1.jpeg" />
                <img src="assets/banner1.jpeg" />
                <img src="assets/banner1.jpeg" />
              </Carousel>
            </Col>
            <Col
              md={6}
              style={{
                marginTop: "5%",
              }}
            >
              <h1>Hello World</h1>
              <p>
                My name is Abdul Wahab Raza I am student of Bahria University
                <br />
                Islamabad and pursuing my computer science
                <br /> Degree from here.
              </p>
            </Col>
          </Row>
        </CarouselStyle>
        <h1>Hello World</h1>
        <br />
        <h1>Hello World</h1>
        <br />
        <h1>Hello World</h1>
        <br />
        <h1>Hello World</h1>
        <br />
        <h1>Hello World</h1>
        <br />
        <h1>Hello World</h1>
        <br />
        <h1>Hello World</h1>
        <br />
        <h1>Hello World</h1>
        <br />
        <h1>Hello World</h1>
        <br />
        <h1>Hello World</h1>
        <br />
        <h1>Hello World</h1>
        <br />
        <h1>Hello World</h1>
      </Container>
    </>
  ) : (
    <></>
  );
};

export default Home;
