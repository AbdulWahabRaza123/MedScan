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
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
const CarouselStyle = styles.div` 
margin-top:4.3%;
margin-bottom:8%;
.c_img{
  height:85vh;
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
    title: "Login the system",
    description: "Click on login button and fill information if you are already registered else register yourself.",
    color: "primary",
  },
  {
    title: "X-Ray Report",
    description:
      "Services section and home tab containing the card of X-Rays Report Generation, click on Go here.",
    color: "success",
  },
  {
    title: "Enjoy",
    description: "Now get benafit of automated system.",
    color: "info",
  },
];
const Home = () => {
  const [mount, setMount] = useState(false);
  const { NavState, NavDispatch } = useContext(NavContext);
  const router = useRouter();
  useEffect(() => {
    async function verifyUser() {
      const login = localStorage.getItem("login");
      if (login) {
        setMount(true);
        const info = await JSON.parse(login);

        if (info.mode === "user") {
          NavDispatch({ type: "Nav", payload: "user" });
          router.push("/User");
        } else if (info.mode === "radiologist") {
          NavDispatch({ type: "Nav", payload: "radiologist" });
          router.push("/Radiologist");
        } else if (info.mode === "admin") {
          NavDispatch({ type: "Nav", payload: "admin" });
          router.push("/Admin");
        }
      } else {
        setMount(true);
        router.push("/");
      }
    }
    verifyUser();
  }, []);
  return mount ? (
    <>
     
      <NavbarComp title="Home" />
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
