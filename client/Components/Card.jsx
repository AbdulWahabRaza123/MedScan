import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Spacer } from "./Spacer";
import MaterialCard from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Card from "react-bootstrap/Card";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import { Row, Col, Wrapper } from "./Layout";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { P } from "./Typography";
const ContactCard = (props) => {
  return (
    <>
      <Col md={4} className="mt-5">
        <props.icon
          className="mt-1 mb-2"
          style={{ color: "gray", fontSize: "30px" }}
        />
        <h4>{props.title}</h4>
        <p>
          <b className="me-2">{props.title}:</b>
          {props.content}
        </p>
      </Col>
    </>
  );
};

const CardComp = (props) => {
  const Router = useRouter();
  const [file, setFile] = useState(null);
  const [showImage, setShowImage] = useState(null);
  const [report, setReport] = useState("Hello...");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const regex = new RegExp("[a-z]*[0-9]*.@gmail.com");
  // Patient States
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    radiologistName: "",
  });
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "100%",
    bgcolor: "background.paper",
    boxShadow: 24,
    height: "100vh",
    overflow: "scroll",
    p: 2,
  };

  const GenerateReport = async () => {
    try {
      if (email) {
        const res = await axios.post(
          "/GenerateReport",
          { file, patitentEmail: email, radiologistEmail: props.data.email },
          {
            headers: {
              "Content-Type": "multipart/form-data",
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
      console.log("This is data ", data.data);
      if (data.message === "done") {
        if (data.data) {
          var arrayBufferView = new Uint8Array(
            data.data.patientReport.filedata.data.data
          );
          const imageBlob = new Blob([arrayBufferView], {
            type: "image/jpeg",
          });
          setShowImage(imageBlob);
          setReport(data.data.patientReport.report);
          setUserData((...val) => ({
            name: data.data.patientData.name,
            email: data.data.patientData.email,
            radiologistName: data.data.radiologistData.name,
          }));
        } else {
          alert("Data not found");
        }
      } else {
        alert("Data not found");
      }
    } catch (e) {
      alert("Error!!!");
    }
  };
  useEffect(() => {
    if (props.mode === "user") {
      if (props.data.email) {
        getPatientReport(props.data.email);
      }
    }
  }, [props.mode == "user"]);
  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <div>
              <h2>Report Generation</h2>
            </div>
            <CloseIcon
              style={{ cursor: "pointer", fontSize: "40px" }}
              onClick={handleClose}
            />
          </div>
          {props.mode === "radiologist" ? (
            <>
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
                          setShowImage(event?.target?.files[0]);
                          const formData = new FormData();
                          formData.append(
                            "Image",
                            event?.target?.files[0],
                            event?.target?.files[0]?.name
                          );
                          setFile(formData);
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
                          setFile(null);
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
            </>
          ) : null}
          {/* User  */}
          {props.mode === "user" ? (
            <Wrapper className="mt-4">
              <Spacer height="10vh" />
              <Row>
                <Col md={4}>
                <Spacer height="25px" />
                <P className="mb-5" size="24px" color="black" weight="600">Details:</P>
                <Wrapper width="90%">
                <Wrapper className="d-flex flex-row align-items-center justify-content-between">
                  <Wrapper className="d-flex flex-column">
                  <P weight="500">Patient Name is:</P>
                      <P weight="500">Patient Email is:</P>
                      <P weight="500">Radiologist Name is:</P>
                  </Wrapper>
                  <Wrapper className="d-flex flex-column">
                  <P>{userData.name}</P>
                      <P>{userData.email}</P>
                      <P>{userData.radiologistName}</P>
                  </Wrapper>
                </Wrapper>
                </Wrapper>
                 
                  <Button
                  className="mt-3"
                    variant="contained"
                    sx={{ background: "#183e8f" }}
                    onClick={() => {
                      console.log("This is download");
                    }}
                  >
                    Download
                  </Button>
                </Col>
                <Col md={4} className="mt-5">
                  <Wrapper>
                    {showImage && (
                      <img
                        alt="not found"
                        width={"70%"}
                        style={{ border: "1px solid black" }}
                        src={URL.createObjectURL(showImage)}
                      />
                    )}
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
                      {!loading ? report : "Loading..."}
                    </P>
                  </Wrapper>
                </Col>
              </Row>
            </Wrapper>
          ) : null}
        </Box>
      </Modal>
      <MaterialCard
        sx={{ maxWidth: 345 }}
        style={{ boxShadow: "5px 5px 10px gray" }}
      >
        <CardMedia
          component="img"
          alt="green iguana"
          height="140"
          image="/assets/service1.jpg"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            X Ray Report
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Your Report Status can check from here and if your report is
            available then your can easily access your report and contact to
            your doctor
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            onClick={() => {
              if (props.restrict) Router.push("/Login");
              else handleOpen();
            }}
          >
            <b>Go</b>
          </Button>
          <Button size="small">Learn More</Button>
        </CardActions>
      </MaterialCard>
    </>
  );
};
const StepsCard = (props) => {
  return (
    <>
      <Card
        className="mt-4"
        style={{
          width: "100%",
          height: "150px",
          overflow: "auto",
          boxShadow: "5px 5px 10px gray",
        }}
      >
        <Card.Body>
          <Card.Title style={{ color: "#183e8f", fontWeight: "600" }}>
            {props.title}
          </Card.Title>
          <Card.Text style={{ color: "gray" }}>{props.description}</Card.Text>
        </Card.Body>
      </Card>
    </>
  );
};
export { StepsCard, ContactCard };
export default CardComp;
