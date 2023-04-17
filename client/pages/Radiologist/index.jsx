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
  const UploadImage=async(image)=>{
try{
  if (image) {
    const formData = new FormData();
    formData.append("file", image);
    const boundary = `----${new Date().getTime()}`;
    const url="/UploadImage";
    axios
    .post(url, formData, {
      headers: {
        "Content-Type": `multipart/form-data; boundary=${boundary}`,
      },
    })
    .then((res) => {
      
    })
    .catch((e) => {
      alert("Upload Image Again!!!");
    });
  }
}catch(e){
  console.log("This is error ",e);
}
  }
  const GenerateReport = async () => {
    try {
      if (email) {
      
        const res = await axios.post(
          "/GenerateReport",
          {  patientEmail: email, radiologistEmail: data.email },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (res.data.message === "done") {
          setLoading(false);
          setEmail("");
          setReport(res.data.report);
          setDone(true);
        } else {
          setLoading(false);
          setEmail("");
          setReport("Report Error!!! Enter right email");
        }
      } else {
        alert("Enter the email");
      }
    } catch (ex) {
      setLoading(false);
      setEmail("");
      setReport("Report Error!!! Enter right email");
    }
  };
  useEffect(() => {
    async function verifyRadiologist() {
      // authRadiologist();
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
            <CardComp mode={"radiologist"} data={data}>
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
                            UploadImage(event.target.files[0]);
                            setShowImage(event.target.files[0]);
                            // const formData = new FormData();
                            // formData.append(
                            //   "file",
                            //   event.target.files[0]
                            // );
                            // formData.append("ImageName",  event.target.files[0].name);
                            // setFile(formData);
                          }
                          else{
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
                                setLoading(true);
                                GenerateReport();
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
                      height="25vh"
                      bg="black"
                      border="1px solid gray"
                      color="white"
                      borderRadius="15px"
                    >
                      <P className="mb-0" size="12px">
                        {!loading ? report : "Loading..."}
                      </P>
                    </Wrapper>
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
