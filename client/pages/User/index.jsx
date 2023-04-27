import React, { useState, useEffect, useContext } from "react";
import { useRouter, useLocation } from "next/router";
import NavbarComp from "../../Components/Navbar";
import Footer from "../../Components/Footer";
import { NavContext } from "../_app";
import { Carousel } from "react-responsive-carousel";
import { Container, Row, Col, Wrapper } from "../../Components/Layout";
import { StepsCard } from "../../Components/Card";
import { BtnProfile } from "../../Components/Buttons";
import { Spacer } from "../../Components/Spacer";
import { P } from "../../Components/Typography";
import Button from "@mui/material/Button";
import CardComp from "../../Components/Card";
import Loading from "../../Components/Loading";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import styles from "styled-components";
const CarouselStyle = styles.span` 

`;
const CeroselData = [
  "assets/banner3.jpg",
  "assets/banner2.jpg",
  "assets/banner1.jpg",
];
const ImageStyle = {
  width: "100%",
  border: "1px solid black",
};
const Index = () => {
  const Router = useRouter();
  const [mount, setMount] = useState(false);
  const [data, setData] = useState(null);
  const [showImage, setShowImage] = useState(null);
  const [report, setReport] = useState("Hello...");
  const [gotReport, setGotReport] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fullScreenReport, setFullScreenReport] = useState({
    radiologistName: "",
    radiologistEmail: "",
    patientName: "",
    patientEmail: "",
    image: "",
    report: "",
  });
  const [openFullScreen, setOpenFullScreen] = useState(false);
  const [userData, setUserData] = useState([]);
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
        const info = await JSON.parse(login);
        setData(info);
        setMount(true);
        NavDispatch({ type: "Nav", payload: "user" });
      }
    }
    verifyUser();
  }, []);
  const getPatientReport = async (email) => {
    try {
      const res = await fetch("/getPatientReport", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
        }),
        withCredentials: true,
      });
      const data = await res.json();

      if (data.message === "done") {
        setUserData([]);
        const userInfo = data.data;
        if (userInfo) {
          for (let i = 0; i < userInfo.length; i++) {
            const base64String = userInfo[i].reports.filedata.data;
            const binaryString = Buffer.from(base64String, "base64");
            const arrayBuffer = new ArrayBuffer(binaryString.length);
            const arrayBufferView = new Uint8Array(arrayBuffer);
            for (let j = 0; j < binaryString.length; j++) {
              arrayBufferView[j] = binaryString[j];
            }
            const imageBlob = new Blob([arrayBufferView], {
              type: userInfo[i].reports.filedata.contentType,
            });
            const src = URL.createObjectURL(imageBlob);
            setUserData((val) => [
              ...val,
              {
                radiologistEmail: userInfo[i].radiologistEmail,
                radiologistName: userInfo[i].radiologistName,
                image: src,
                patientEmail: userInfo[i].reports.patientEmail,
                patientName: userInfo[i].reports.patientName,
                report: userInfo[i].reports.report,
              },
            ]);
          }

          setGotReport(true);
        } else {
          setUserData([]);
          alert("Data not found");
        }
      } else {
        setUserData([]);
        setGotReport(false);
        // alert("Data not found");
        // Router.push("/User/Logout");
      }
    } catch (e) {
      setUserData([]);
      alert("Error!!!");
    }
  };
  useEffect(() => {
    if (data?.email) {
      setUserData([]);
      getPatientReport(data.email);
    }
  }, [data]);
  useEffect(() => {
    console.log("This is user data ", userData.length);
  }, [userData]);
  return mount ? (
    <>
      <NavbarComp name={data.name} />
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
                {CeroselData.map((val, index) => {
                  return (
                    <>
                      <div key={index}>
                        <img style={{ borderRadius: "25px" }} src={val} />
                      </div>
                    </>
                  );
                })}
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
            <CardComp width="100%" height="100%" heading="Patient">
              <Wrapper className="mt-4">
                <Spacer height="10vh" />

                {gotReport ? (
                  <>
                    {!openFullScreen && (
                      <>
                        <Row style={{ height: "70vh", overflow: "scroll" }}>
                          {Array.isArray(userData) &&
                            userData.map((val, index) => {
                              return (
                                <>
                                  <Col md={4} key={index}>
                                    <StepsCard
                                      mode="patient_report"
                                      title={val.radiologistName}
                                      image={val.image}
                                      description={val.report}
                                      patientName={val.patientName}
                                      patientEmail={val.patientEmail}
                                      radiologistEmail={val.radiologistEmail}
                                      openFullScreen={openFullScreen}
                                      setOpenFullScreen={setOpenFullScreen}
                                      fullScreenReport={fullScreenReport}
                                      setFullScreenReport={setFullScreenReport}
                                    />
                                  </Col>
                                </>
                              );
                            })}
                        </Row>
                      </>
                    )}

                    {openFullScreen && fullScreenReport && (
                      <>
                        <Row>
                          <Col md={4}>
                            <Spacer height="25px" />
                            <P
                              className="mb-5"
                              size="24px"
                              color="black"
                              weight="600"
                            >
                              Details:
                            </P>

                            <Wrapper width="90%">
                              <Wrapper className="d-flex flex-row align-items-center justify-content-between">
                                <Wrapper className="d-flex flex-column">
                                  <P weight="500">Patient Name is:</P>
                                  <P weight="500">Patient Email is:</P>
                                  <P weight="500">Radiologist Name is:</P>
                                  <P weight="500">Radiologist Email is:</P>
                                </Wrapper>
                                <Wrapper className="d-flex flex-column">
                                  <P>{fullScreenReport.patientName}</P>
                                  <P>{fullScreenReport.patientEmail}</P>
                                  <P>{fullScreenReport.radiologistName}</P>
                                  <P>{fullScreenReport.radiologistEmail}</P>
                                </Wrapper>
                              </Wrapper>
                            </Wrapper>
                            <Wrapper className="mt-5">
                              <Button
                                variant="contained"
                                sx={{ background: "#183e8f" }}
                                onClick={() => {
                                  console.log("This is download");
                                }}
                              >
                                Download
                              </Button>
                              <Button
                                variant="contained"
                                className="bg-danger ms-2"
                                onClick={() => {
                                  setFullScreenReport({
                                    radiologistName: "",
                                    radiologistEmail: "",
                                    patientName: "",
                                    patientEmail: "",
                                    image: "",
                                    report: "",
                                  });
                                  setOpenFullScreen(false);
                                }}
                              >
                                Close
                              </Button>
                            </Wrapper>
                          </Col>
                          <Col md={4} className="mt-5">
                            <Wrapper>
                              {
                                <img
                                  alt="report"
                                  width={"70%"}
                                  height={"70%"}
                                  style={{ border: "1px solid black" }}
                                  src={fullScreenReport.image}
                                />
                              }
                            </Wrapper>
                          </Col>
                          <Col md={4} className="mt-5">
                            <Wrapper
                              className="p-3"
                              width="70%"
                              height="25vh"
                              bg="black"
                              border="1px solid gray"
                              color="white"
                              borderRadius="15px"
                            >
                              <P className="mb-0" size="12px">
                                {!loading
                                  ? fullScreenReport.report
                                  : "Loading..."}
                              </P>
                            </Wrapper>
                          </Col>
                        </Row>
                      </>
                    )}
                  </>
                ) : (
                  <>
                    <Wrapper
                      className="d-flex flex-row align-items-center justify-content-center"
                      height="70vh"
                    >
                      <P color="gray">Data Not Found</P>
                    </Wrapper>
                  </>
                )}
              </Wrapper>
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
