import NavbarComp from "../Components/Navbar";
import { useState, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import styles from "styled-components";
import { Container, Row, Col } from "../Components/Layout";
import Footer from "../Components/Footer";
const CarouselStyle = styles.div` 
margin-top:4.3%;
margin-bottom:8%;
.c_img{
  height: 530px;
}
@media screen and (max-width: 754px) {
  margin-top:25%;
  .c_img{
    width:100% !important;
    height: 100%;
  }
`;
const ImageStyle = {
  width: "100%",
  border: "1px solid black",
};
const Section2 = styles.div` 

`;
const Home = () => {
  const [mount, setMount] = useState(false);
  useEffect(() => {
    setMount(true);
  }, []);
  return mount ? (
    <>
      <NavbarComp title="Home" />
      <CarouselStyle>
        <Carousel
          dynamicHeight={false}
          autoplay={true}
          infiniteLoop={true}
          showStatus={false}
          showArrows={false}
          showThumbs={false}
        >
          <img
            className="c_img"
            style={ImageStyle}
            src="assets/banner1.jpg"
            alt="banner1"
          />
          <img
            className="c_img"
            style={ImageStyle}
            src="assets/banner2.jpg"
            alt="banner2"
          />
          <img
            className="c_img"
            style={ImageStyle}
            src="assets/banner3.jpg"
            alt="banner3"
          />
        </Carousel>
      </CarouselStyle>
      <Container>
        <Section2 className="text-center">
          <h1>How to Use?</h1>
        </Section2>
      </Container>
      <Footer />
    </>
  ) : (
    <></>
  );
};

export default Home;
