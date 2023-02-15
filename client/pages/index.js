import NavbarComp from "../Components/Navbar";
import { NavContext } from "./_app";
import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { Carousel } from "react-responsive-carousel";
import styles from "styled-components";
import { Container, Row, Col } from "../Components/Layout";
import { Wrapper } from "../Components/Layout";
import { StepsCard } from "../Components/Card";
import Footer from "../Components/Footer";
import Loading from "../Components/Loading";
const CarouselStyle = styles.div` 
margin-top:4.3%;
margin-bottom:8%;
.c_img{
  height: 558px;
}
@media screen and (max-width: 754px) {
  margin-top:20%;
  .c_img{
    width:100% !important;
    height: 30vh;
  }
`;
const ImageStyle = {
  width: "100%",
  border: "1px solid black",
};
const Section2 = styles.div` 
`;
const StepsCardData = [
  {
    title: "Go to Services Page",
    description: "Once your login you can get the report from services page",
    color: "primary",
  },
  {
    title: "X-Ray Report",
    description:
      "In Services page find X-Ray Report Section and click on go button. On next page you can see...",
    color: "success",
  },
  {
    title: "Pending Title",
    description: "...",
    color: "info",
  },
];
const Home = () => {
  const [mount, setMount] = useState(false);
  const { NavState, NavDispatch } = useContext(NavContext);
  const router = useRouter();
  useEffect(() => {
    const login = localStorage.getItem("login");
    if (login) {
      setMount(false);
      NavDispatch({ type: "Nav", payload: false });
      router.push("/User/");
    } else {
      setMount(true);
      router.push("/");
    }
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
        <Section2 className="mb-5">
          <Wrapper className="text-center">
            <h1 style={{ color: "#183e8f", fontWeight: "700" }}>How to Use?</h1>
            <p style={{ color: "gray" }}>
              <i> Here are some steps which can lead you to fetch the report</i>
            </p>
          </Wrapper>
          <Row>
            {StepsCardData.map((val, index) => {
              return (
                <>
                  <Col md={4} key={index}>
                    <StepsCard
                      title={val.title}
                      description={val.description}
                      color={val.color}
                    />
                  </Col>
                </>
              );
            })}
          </Row>
        </Section2>
      </Container>
      <Footer />
    </>
  ) : (
    <>
      <Loading />
    </>
  );
};

export default Home;
