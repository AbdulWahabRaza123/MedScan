import React, { useState, useEffect, useContext } from "react";
import { NavContext } from "../_app";
import { Container, Row, Col, Wrapper } from "../../Components/Layout";
import Footer from "../../Components/Footer";
import NavbarComp from "../../Components/Navbar";
import { Carousel } from "react-responsive-carousel";
import { BtnProfile } from "../../Components/Buttons";
import { P } from "../../Components/Typography";
import CardComp from "../../Components/Card";
import Loading from "../../Components/Loading";
import styles from "styled-components";
import Form from "react-bootstrap/Form";
import { Spacer } from "../../Components/Spacer";
import axios from "axios";
import SendIcon from "@mui/icons-material/Send";
import Button from "@mui/material/Button";
import { useRouter } from "next/router";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ReplayIcon from "@mui/icons-material/Replay";
import PublishIcon from "@mui/icons-material/Publish";
const CarouselStyle = styles.span` 

`;
const ImageStyle = {
  width: "100%",
  border: "1px solid black",
};
const CeroselData = [
  "assets/banner3.jpg",
  "assets/banner2.jpg",
  "assets/banner1.jpg",
];

const Index = () => {
  const Router = useRouter();
  const [mount, setMount] = useState(false);
  const [data, setData] = useState(null);
  const [done, setDone] = useState(false);
  const [email, setEmail] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const regex = new RegExp("[a-z]*[0-9]*.@gmail.com");
  const [showImage, setShowImage] = useState(null);
  const [report, setReport] = useState("Hello...");
  const { NavState, NavDispatch } = useContext(NavContext);
  const WriteReport = async () => {
    try {
      if (showImage) {
        setLoading(true);
        const formData = new FormData();
        formData.append("img1", showImage);
        const res = await axios.post("http://localhost:5000/single", formData);
        if (res.status === 200) {
          setReport(res.data.report);
          setLoading(false);
        } else {
          setLoading(false);
          setReport("Report Error!!! Enter right email");
        }
      } else {
        alert("select an image!");
      }
    } catch (e) {
      setReport("Report Error!!! Enter right email");
      setLoading(false);
    }
  };
  const GenerateReport = async () => {
    try {
      if (email && showImage) {
        const formData = new FormData();
        formData.append("file", showImage);
        formData.append("patientEmail", email);
        formData.append("radiologistEmail", data.email);
        formData.append("generatedReport", report);
        const boundary = `----${new Date().getTime()}`;
        const res = await axios.post("/GenerateReport", formData, {
          headers: {
            "Content-Type": `multipart/form-data; boundary=${boundary}`,
          },
        });

        if (res.data.message === "done") {
          setDone(true);
          alert("Report Submitted!");
        } else {
          setEmail("");
          alert("Error Occured!");
        }
      } else {
        alert("Enter the email");
      }
    } catch (ex) {
      setEmail("");
      alert("Error Occured!");
    }
  };
  useEffect(() => {
    async function verifyRadiologist() {
      const login = localStorage.getItem("login");
      if (!login) {
        setMount(false);
        Router.push("/Login");
      } else {
        const info = await JSON.parse(login);
        setData(info);
        setMount(true);
        NavDispatch({ type: "Nav", payload: "radiologist" });
      }
    }
    verifyRadiologist();
  }, []);
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
            <CardComp width="100%" height="100%" heading="Radiologist">
              <Wrapper>
                <Spacer height="10vh" />
                <Row>
                  <Col md={4}>
                    {/* Input */}
                    <Wrapper className="mb-4">
                      <Form.Control
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                        value={email}
                        type="email"
                        placeholder="Enter email"
                        style={{ width: "80%" }}
                      />
                    </Wrapper>
                    <Button
                      variant="contained"
                      component="label"
                      sx={{ background: "#183e8f" }}
                    >
                      Upload
                      <input
                        hidden
                        accept="image/*"
                        type="file"
                        onChange={(event) => {
                          if (event.target.files[0]) {
                            setShowImage(event.target.files[0]);
                          } else {
                            alert("Upload Again!!!");
                          }
                        }}
                      />
                    </Button>

                    {showImage && (
                      <Button
                        variant="contained"
                        component="label"
                        color="error"
                        className="ms-2"
                        onClick={() => {
                          setShowImage(null);
                          // setFile(null);
                        }}
                      >
                        Remove
                      </Button>
                    )}
                  </Col>
                  <Col md={4} className="mt-5">
                    {showImage && (
                      <Wrapper>
                        <img
                          alt="not found"
                          width={"70%"}
                          style={{ border: "1px solid black" }}
                          src={URL.createObjectURL(showImage)}
                        />
                        <br />
                        <Wrapper>
                          <P className="mt-1" color="gray" size="12px">
                            {regex.test(email)
                              ? "Click on Next to generate Report"
                              : "Fill email field and get Next Button to generate report"}
                          </P>
                          {regex.test(email) ? (
                            <Button
                              variant="contained"
                              endIcon={<SendIcon />}
                              sx={{ background: "#183e8f" }}
                              onClick={() => {
                                WriteReport();
                              }}
                            >
                              Next
                            </Button>
                          ) : null}
                        </Wrapper>
                      </Wrapper>
                    )}
                  </Col>
                  <Col md={4} className="mt-5">
                    <Wrapper
                      className="p-3"
                      width="70%"
                      height="32vh"
                      bg="black"
                      border="1px solid gray"
                      color="white"
                      borderRadius="15px"
                    >
                      {!loading && report && (
                        <>
                          <Wrapper className="d-flex flex-row align-items-center justify-content-end mb-3">
                            <ContentCopyIcon
                              className="me-2"
                              style={{ fontSize: "16px", cursor: "pointer" }}
                            />
                            <ReplayIcon
                              onClick={() => {
                                WriteReport();
                              }}
                              style={{ fontSize: "16px", cursor: "pointer" }}
                            />
                          </Wrapper>
                        </>
                      )}
                      <P className="mb-0" size="12px">
                        {!loading ? report : "Loading..."}
                      </P>
                    </Wrapper>
                    {!loading && report !== "Hello..." && (
                      <Button
                        className="mt-3 ms-2"
                        variant="contained"
                        endIcon={<PublishIcon />}
                        sx={{ background: "#183e8f" }}
                        onClick={() => {
                          GenerateReport();
                        }}
                      >
                        Submit
                      </Button>
                    )}
                  </Col>
                </Row>
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
